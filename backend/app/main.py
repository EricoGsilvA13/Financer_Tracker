from fastapi import FastAPI

from app.database.base import Base
from app.database.database import engine

from app.models.categorias import Categoria
from app.models.despesas import Despesa
from app.models.receitas import Receita
from app.models.usuarios import Usuario

app = FastAPI(title="Finance Tracker")

Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "Finance Tracker API"}



#uvicorn app.main:app --reload
#deactivate