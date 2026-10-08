from pydantic import BaseModel, ConfigDict, Field
from decimal import Decimal
from datetime import datetime, date

class ReceitaSchemaBase(BaseModel):
    descricao: str = Field(min_length=3, max_length=200)
    valor: Decimal = Field(gt=0)
    
    model_config = ConfigDict(from_attributes=True)

class ReceitaSchemaCreate(ReceitaSchemaBase):
    usuario_id: int = Field(gt=0)
    categoria_id: int = Field(gt=0)
    data_movimentacao: date

class ReceitaSchemaResponse(ReceitaSchemaBase):
    id: int = Field(gt=0)
    usuario_id: int = Field(gt=0)
    categoria_id: int = Field(gt=0)
    data_criacao: datetime
    data_movimentacao: date
