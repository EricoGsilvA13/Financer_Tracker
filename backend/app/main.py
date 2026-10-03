from fastapi import FastAPI


app = FastAPI(title="Finance Tracker")

@app.get("/")
def root():
    return {"message": "Finance Tracker API"}



#uvicorn app.main:app --reload
#deactivate