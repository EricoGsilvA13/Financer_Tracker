from pydantic import BaseModel, Field, ConfigDict
from decimal import Decimal
from datetime import datetime, date

class DespesaSchemaBase(BaseModel):
    descricao: str = Field(min_length=3, max_length=200)
    valor: Decimal = Field(gt=0)

    model_config = ConfigDict(from_attributes=True)

class DespesaSchemaCreate(DespesaSchemaBase):
    usuario_id: int = Field(gt=0)
    categoria_id: int = Field(gt=0)
    data_movimentacao: date

class DespesaSchemaResponse(DespesaSchemaBase):
    id: int = Field(gt=0)
    usuario_id: int = Field(gt=0)
    categoria_id: int = Field(gt=0)
    data_criacao: datetime
    data_movimentacao: date