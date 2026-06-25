import pandas as pd
from agents.model_agent import ModelAgent
from agents.train_agent import TrainAgent

class DataAgent:

    def analyze(self, filepath):

        df = pd.read_csv(filepath)

        target = df.columns[-1]

        X = df.drop(columns=[target])
        y = df[target]

        unique_values = df[target].nunique()

        if unique_values <= 20:
            task_type = "classification"
        else:
            task_type = "regression"

        model_agent = ModelAgent()
        recommended_models = model_agent.recommend(task_type)

        trainer = TrainAgent()
        training_results = trainer.train(X, y)

        report = {
            "rows": len(df),
            "columns": len(df.columns),
            "column_names": list(df.columns),
            "missing_values": int(df.isnull().sum().sum()),
            "target_column": target,
            "unique_target_values": int(unique_values),
            "task_type": task_type,
            "recommended_models": recommended_models,
            "training_results": training_results
        }

        return report