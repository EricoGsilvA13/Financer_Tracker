from app.database.database import SessionLocal
from app.services.usuarios_service import UsuarioService
from app.schemas.usuarios import UsuarioSchemaCreate, UsuarioSchemaResponse
from app.schemas.common import MessageModel
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

usuario_router = APIRouter(prefix="/usuarios", tags=["usuarios"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@usuario_router.post("", response_model=UsuarioSchemaResponse)
def criar_usuario(usuario_schema: UsuarioSchemaCreate, db: Session = Depends(get_db)):

    novo_usuario = UsuarioService().criar_usuario(db, usuario_schema)

    return novo_usuario

@usuario_router.get("", response_model=list[UsuarioSchemaResponse])
def listar_usuarios(db: Session = Depends(get_db)):
    
    usuarios = UsuarioService().listar_usuarios(db)

    return usuarios

@usuario_router.get("/{usuario_id}", response_model=UsuarioSchemaResponse)
def buscar_usuario_por_id(usuario_id: int, db: Session = Depends(get_db)):

    usuario = UsuarioService().buscar_usuario_id(db, usuario_id)

    return usuario

@usuario_router.put("/{usuario_id}", response_model=UsuarioSchemaResponse)
def atualizar_usuario(usuario_schema: UsuarioSchemaCreate, usuario_id: int, db: Session = Depends(get_db)):

    usuario = UsuarioService().atualizar_usuario(db, usuario_id, usuario_schema)

    return usuario

@usuario_router.delete("/{usuario_id}", response_model=MessageModel)
def excluir_usuario(usuario_id: int, db: Session = Depends(get_db)):

    UsuarioService().excluir_usuario_id(db, usuario_id)

    return {"message": "Usuario excluido com seucesso"}