from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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