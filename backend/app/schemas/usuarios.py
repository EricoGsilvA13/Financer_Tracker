from pydantic import BaseModel, ConfigDict
from datetime import datetime


class UsuarioSchemaBase(BaseModel):
    nome: str
    email: str

    model_config = ConfigDict(from_attributes=True)

class UsuarioSchemaCreate(UsuarioSchemaBase):
    senha: str
    
class UsuarioSchemaResponse(UsuarioSchemaBase):
    id: int
    data_criacao: datetime
    