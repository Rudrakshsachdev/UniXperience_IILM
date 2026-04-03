from fastapi import APIRouter, HTTPException
import json
import os

router = APIRouter()

BASE_PATH = os.path.dirname(__file__)
DATA_PATH = os.path.join(BASE_PATH, "../../../data/schedule.json")

@router.get("/schedule")
async def get_schedule():
    """
    Returns the weekly class schedule from the JSON data file.
    """
    try:
        if not os.path.exists(DATA_PATH):
            raise HTTPException(status_code=404, detail=f"Schedule data not found at {DATA_PATH}")
            
        with open(DATA_PATH, "r", encoding="utf-8") as f:
            schedule_data = json.load(f)
            return {"status": "success", "data": schedule_data}
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
