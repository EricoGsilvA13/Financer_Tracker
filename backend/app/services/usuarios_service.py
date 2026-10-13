from app.schemas.usuarios import UsuarioSchemaCreate, UsuarioSchemaResponse
from app.models.usuarios import Usuario
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.core.security import gerar_hash

class UsuarioService:
    def _obter_usuario_por_id(self, db: Session, usuario_id: int):
        
        id_usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
        if not id_usuario:
            raise HTTPException(status_code=404, detail="Usuario não existe")

        return id_usuario
        
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
    
    def listar_usuarios(self, db: Session):

        usuarios = db.query(Usuario).all()

        return usuarios

    def buscar_usuario_id(self, db: Session, usuario_id: int):

        id_usuario = self._obter_usuario_por_id(db, usuario_id)

        return id_usuario
    
    def atualizar_usuario(self, db: Session, usuario_id: int, usuario_schema: UsuarioSchemaCreate):

        usuario = self._obter_usuario_por_id(db, usuario_id)

        email_existente = db.query(Usuario).filter(Usuario.email == usuario_schema.email).first()
        if email_existente and email_existente.id != usuario_id:
            raise HTTPException(status_code=409, detail="Email ja cadastrado")

        senha_hash = gerar_hash(usuario_schema.senha)

        usuario.nome = usuario_schema.nome
        usuario.email = usuario_schema.email
        usuario.senha_hash = senha_hash

        db.commit()
        db. refresh(usuario)

        return usuario

    def excluir_usuario_id(self, db: Session, usuario_id: int):

        id_usuario = self._obter_usuario_por_id(db, usuario_id)
        
        db.delete(id_usuario)
        db.commit()

        return {"message": "Usuario excluido com sucesso"}