from pydantic import BaseModel, ConfigDict, EmailStr, Field
from datetime import datetime


class UsuarioSchemaBase(BaseModel):
    nome: str = Field(max_length=80)
    email: EmailStr

    model_config = ConfigDict(from_attributes=True)

class UsuarioSchemaCreate(UsuarioSchemaBase):
    senha: str = Field(min_length=8)
    
class UsuarioSchemaResponse(UsuarioSchemaBase):
    id: int
    data_criacao: datetime
    