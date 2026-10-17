from pydantic import BaseModel, ConfigDict
from decimal import Decimal
from sqlalchemy import String
from app.models.categorias import TipoCategoria

class SaldoAtualSchemaResponse(BaseModel):
    total_despesas: Decimal
    total_receitas: Decimal
    saldo_atual: Decimal

    model_config = ConfigDict(from_attributes=True)

class TotaisporCategoriaSchemaResponse(BaseModel):
    categoria: str
    total: Decimal

    model_config = ConfigDict(from_attributes=True)