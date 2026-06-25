import pandas as pd
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, r2_score

class TrainAgent:

    def train(self, X, y):
        # 1. Preprocessing of X
        X = X.copy()
        for col in X.columns:
            # Handle missing values
            if X[col].isnull().any():
                if X[col].dtype == 'object':
                    X[col] = X[col].fillna(X[col].mode()[0] if not X[col].mode().empty else 'Missing')
                else:
                    X[col] = X[col].fillna(X[col].median())
            
            # Handle categorical variables
            if X[col].dtype == 'object':
                if X[col].nunique() > 15:
                    # Drop high-cardinality ID-like columns
                    X = X.drop(columns=[col])
                else:
                    # Label encode
                    X[col] = X[col].astype('category').cat.codes

        # 2. Preprocessing of y
        y = y.copy()
        if y.isnull().any():
            if y.dtype == 'object':
                y = y.fillna(y.mode()[0] if not y.mode().empty else 'Missing')
            else:
                y = y.fillna(y.median())

        if y.dtype == 'object' or y.nunique() <= 20:
            y = y.astype('category').cat.codes

        # 3. Train/Test Split
        X_train, X_test, y_train, y_test = train_test_split(
            X, y,
            test_size=0.2,
            random_state=42
        )

        results = {}

        # 4. Determine task type to select models
        unique_y = len(set(y_train))
        is_classification = unique_y <= 20

        if is_classification:
            models = {
                "RandomForestClassifier": RandomForestClassifier(random_state=42),
                "LogisticRegression": LogisticRegression(max_iter=1000, random_state=42)
            }
            metric_fn = accuracy_score
        else:
            models = {
                "RandomForestRegressor": RandomForestRegressor(random_state=42),
                "LinearRegression": LinearRegression()
            }
            metric_fn = r2_score

        for name, model in models.items():
            try:
                model.fit(X_train, y_train)
                pred = model.predict(X_test)
                score = metric_fn(y_test, pred)
                results[name] = round(float(score), 4)
            except Exception as e:
                results[name] = 0.0

        return results