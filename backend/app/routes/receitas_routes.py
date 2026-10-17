from app.database.database import SessionLocal
from app.schemas.receitas import ReceitaSchemaCreate, ReceitaSchemaResponse
from app.services.receitas_service import ReceitaService
from app.schemas.common import MessageModel
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

receitas_router = APIRouter(prefix="/receitas", tags=["receitas"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@receitas_router.post("", response_model=ReceitaSchemaResponse)
def criar_receita(receita_schema: ReceitaSchemaCreate, db: Session = Depends(get_db)):

    receita = ReceitaService().criar_receita(db, receita_schema)

    return receita

@receitas_router.get("", response_model=list[ReceitaSchemaResponse])
def listar_receitas(db: Session = Depends(get_db)):

    receitas = ReceitaService().listar_receitas(db)

    return receitas

@receitas_router.get("/{receita_id}", response_model=ReceitaSchemaResponse)
def buscar_receita_por_id(receita_id: int, db: Session = Depends(get_db)):

    receita = ReceitaService().buscar_receita_por_id(db, receita_id)

    return receita

@receitas_router.put("/{receita_id}", response_model=ReceitaSchemaResponse)
def atualizar_receita(receita_id: int, receita_schema: ReceitaSchemaCreate, db: Session = Depends(get_db)):

    receita = ReceitaService().atualizar_receita(db, receita_id, receita_schema)

    return receita

@receitas_router.delete("/{receita_id}", response_model=MessageModel)
def excluir_receita(receita_id: int, db: Session = Depends(get_db)):

    ReceitaService().excluir_receita(db, receita_id)

    return {"message": "Receita excluida com sucesso"}