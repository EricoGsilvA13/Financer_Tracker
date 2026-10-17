from fastapi import APIRouter, Depends
from app.services.despesas_services import DespesasService
from app.database.database import SessionLocal
from app.schemas.common import MessageModel
from app.schemas.despesas import DespesaSchemaResponse, DespesaSchemaCreate
from sqlalchemy.orm import Session


despesas_router = APIRouter(prefix="/despesas", tags=["despesas"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@despesas_router.post("", response_model=DespesaSchemaResponse)
def criar_despesa(despesa_schema: DespesaSchemaCreate, db: Session = Depends(get_db)):

    despesa = DespesasService().criar_despesa(db, despesa_schema)

    return despesa

@despesas_router.get("", response_model=list[DespesaSchemaResponse])
def listar_despesas(db: Session = Depends(get_db)):

    despesas = DespesasService().listar_despesas(db)

    return despesas

@despesas_router.get("/{despesa_id}", response_model=DespesaSchemaResponse)
def buscar_despesa_por_id(despesa_id: int, db: Session = Depends(get_db)):

    despesa = DespesasService().buscar_despesa_por_id(db, despesa_id)

    return despesa

@despesas_router.put("/{despesa_id}", response_model=DespesaSchemaResponse)
def atualizar_despesa(despesa_id: int, despesa_schema: DespesaSchemaCreate, db: Session = Depends(get_db)):

    despesa = DespesasService().atualizar_despesa(db, despesa_id, despesa_schema)

    return despesa

@despesas_router.delete("/{despesa_id}", response_model=MessageModel)
def excluir_despesa(despesa_id: int, db: Session = Depends(get_db)):

    DespesasService().excluir_despesa(db, despesa_id)

    return {"message": "Despesa excluido com sucesso"}    