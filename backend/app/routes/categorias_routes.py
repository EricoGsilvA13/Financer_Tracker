from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import SessionLocal
from app.schemas.categorias import CategoriaSchemaResponse, CategoriaSchemaCreate
from app.services.categorias_services import CategoriaService
from app.schemas.common import MessageModel

categoria_router = APIRouter(prefix="/categorias", tags=["categorias"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@categoria_router.post("", response_model=CategoriaSchemaResponse)
def criar_categoria(categoria_schema: CategoriaSchemaCreate ,db: Session = Depends(get_db)):
    
    nova_categoria = CategoriaService().criar_categoria(db, categoria_schema)

    return nova_categoria

@categoria_router.get("", response_model=list[CategoriaSchemaResponse])
def listar_categorias(db: Session = Depends(get_db)):

    categorias = CategoriaService().listar_categorias(db)

    return categorias

@categoria_router.get("/{categoria_id}", response_model=CategoriaSchemaResponse)
def listar_categoria_por_id(categoria_id: int, db: Session = Depends(get_db)):

    categoria = CategoriaService().buscar_categoria_por_id(db, categoria_id)

    return categoria

@categoria_router.put("/{categoria_id}", response_model=CategoriaSchemaResponse)
def atualizar_categoria(categoria_id: int, categoria_schema: CategoriaSchemaCreate, db: Session = Depends(get_db)):

    categoria = CategoriaService().atualizar_categoria(db, categoria_id, categoria_schema)

    return categoria

@categoria_router.delete("/{categoria_id}", response_model=MessageModel)
def excluir_categoria(categoria_id: int, db: Session = Depends(get_db)):

    CategoriaService().excluir_categoria(db, categoria_id)

    return {"message": "Categoria excluida com sucesso"}