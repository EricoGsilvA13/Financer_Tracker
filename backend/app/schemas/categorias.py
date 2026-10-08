from pydantic import BaseModel, ConfigDict, Field
from app.models.categorias import TipoCategoria
from datetime import datetime

class CategoriaSchemaBase(BaseModel):
    nome: str = Field(min_length=3, max_length=80)
    tipo: TipoCategoria

    model_config = ConfigDict(from_attributes=True)


class CategoriaSchemaCreate(CategoriaSchemaBase):
    pass

class CategoriaSchemaResponse(CategoriaSchemaBase):
    id: int
    data_criacao: datetime

