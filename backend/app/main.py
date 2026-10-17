from fastapi import FastAPI

from app.database.base import Base
from app.database.database import engine

from app.models.categorias import Categoria
from app.models.despesas import Despesa
from app.models.receitas import Receita
from app.models.usuarios import Usuario

from app.routes.usuario_routes import usuario_router
from app.routes.categorias_routes import categoria_router
from app.routes.receitas_routes import receitas_router
from app.routes.despesas_router import despesas_router

app = FastAPI(title="Finance Tracker")

Base.metadata.create_all(bind=engine)

app.include_router(usuario_router)
app.include_router(categoria_router)
app.include_router(receitas_router)
app.include_router(despesas_router)


@app.get("/")
def root():
    return {"message": "Finance Tracker API"}



#uvicorn app.main:app --reload
#deactivate
#.\.venv\Scripts\Activate.ps1