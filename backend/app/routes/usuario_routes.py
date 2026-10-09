from app.database.database import SessionLocal
from app.services.usuarios_service import UsuarioService
from app.schemas.usuarios import UsuarioSchemaCreate, UsuarioSchemaResponse
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