from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import SessionLocal
from app.services.estatisticas_services import EstatisticaService
from app.schemas.estatisticas import SaldoAtualSchemaResponse, TotaisporCategoriaSchemaResponse
from app.schemas.common import TotalSchemaResponse

estatisticas_router = APIRouter(prefix="/estatisticas", tags=["estatisticas"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@estatisticas_router.get("/saldo", response_model=SaldoAtualSchemaResponse)
def saldo(db: Session = Depends(get_db)):

    saldo = EstatisticaService().calcular_saldo(db)

    return saldo

@estatisticas_router.get("/receitas", response_model=TotalSchemaResponse)
def receitas(db: Session = Depends(get_db)):

    receitas = EstatisticaService().calcular_total_receitas(db)

    return receitas

@estatisticas_router.get("/despesas", response_model=TotalSchemaResponse)
def despesas(db: Session = Depends(get_db)):

    despesas = EstatisticaService().calcular_total_despesas(db)

    return despesas

@estatisticas_router.get("/receitas-por-categoria",response_model=list[TotaisporCategoriaSchemaResponse])
def receitas_por_categoria(db: Session = Depends(get_db)):

    receitas_por_categoria = EstatisticaService().calcular_total_receitas_por_categoria(db)

    return receitas_por_categoria

@estatisticas_router.get("/despesas-por-categoria", response_model=list[TotaisporCategoriaSchemaResponse])
def despesas_por_categoria(db: Session = Depends(get_db)):

    despesas_por_categoria = EstatisticaService().calcular_total_despesas_por_categoria(db)

    return despesas_por_categoria