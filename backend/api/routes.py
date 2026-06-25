import os
from fastapi import APIRouter, UploadFile, File, HTTPException
from agents.data_agent import DataAgent

router = APIRouter()

@router.post("/upload")
async def upload_dataset(
    file: UploadFile = File(...)
):
    # Ensure file is a CSV
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are supported.")

    # Ensure datasets directory exists
    os.makedirs("datasets", exist_ok=True)
    filepath = f"datasets/{file.filename}"

    try:
        # Save the uploaded file
        with open(filepath, "wb") as f:
            f.write(await file.read())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save uploaded file: {str(e)}")

    try:
        agent = DataAgent()
        result = agent.analyze(filepath)
        return result
    except Exception as e:
        # Clean up file on failure
        if os.path.exists(filepath):
            try:
                os.remove(filepath)
            except:
                pass
        raise HTTPException(status_code=422, detail=f"Error analyzing dataset and training models: {str(e)}")