from app.schemas.usuarios import UsuarioSchemaCreate, UsuarioSchemaResponse
from app.models.usuarios import Usuario
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.core.security import gerar_hash

class UsuarioService:
    def criar_usuario(self, db: Session, usuario_schema: UsuarioSchemaCreate):

        email_existente = db.query(Usuario).filter(Usuario.email == usuario_schema.email).first()

        if email_existente:
            raise HTTPException(status_code=409, detail="Email ja cadastrado")

        senha_hash = gerar_hash(usuario_schema.senha)

        novo_usuario = Usuario(
            nome=usuario_schema.nome,
            email=usuario_schema.email,
            senha_hash=senha_hash
        )

        db.add(novo_usuario)
        db.commit()
        db.refresh(novo_usuario)

        return novo_usuario