class ModelAgent:

    def recommend(self, task_type):

        if task_type == "classification":
            return [
                "RandomForestClassifier",
                "XGBoostClassifier",
                "LogisticRegression"
            ]

        return [
            "LinearRegression",
            "RandomForestRegressor",
            "XGBoostRegressor"
        ]