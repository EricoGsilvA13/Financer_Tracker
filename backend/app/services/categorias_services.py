from app.models.categorias import Categoria
from app.schemas.categorias import CategoriaSchemaCreate
from fastapi import HTTPException
from sqlalchemy.orm import Session

class CategoriaService:
    def _buscar_categoria_por_id(self, db: Session, categoria_id: int):

        categoria = db.query(Categoria).filter(Categoria.id == categoria_id).first()
        if not categoria:
            raise HTTPException (status_code=404, detail="Categoria não existe")

        return categoria

    def criar_categoria(self, db: Session, categoria_schema: CategoriaSchemaCreate):
        
        nova_categoria = db.query(Categoria).filter(Categoria.nome == categoria_schema.nome).first()
        if nova_categoria:
            raise HTTPException(status_code=409, detail="Categoria com o memso nome já existe")

        nova_categoria = Categoria(
            nome=categoria_schema.nome,
            tipo=categoria_schema.tipo
        )

        db.add(nova_categoria)
        db.commit()
        db.refresh(nova_categoria)

        return nova_categoria

    def listar_categorias(self, db: Session):

        categorias = db.query(Categoria).all()

        return categorias

    def buscar_categoria_por_id(self, db: Session, categoria_id: int):

        categoria = self._buscar_categoria_por_id(db, categoria_id)

        return categoria

    def atualizar_categoria(self, db: Session, categoria_id: int, categoria_schema: CategoriaSchemaCreate):
        
        categoria = self._buscar_categoria_por_id(db, categoria_id)

        nome_categoria = db.query(Categoria).filter(Categoria.nome == categoria_schema.nome).first()

        if nome_categoria and nome_categoria.id != categoria_id:
            raise HTTPException (status_code=409, detail="Nome já cadastrado")

        categoria.nome = categoria_schema.nome
        categoria.tipo = categoria_schema.tipo

        db.commit()
        db.refresh(categoria)
        
        return categoria

    def excluir_categoria(self, db: Session, categoria_id: int):

        categoria = self._buscar_categoria_por_id(db, categoria_id)

        db.delete(categoria)
        db.commit()

        return {"message": "Categoria excluída com sucesso"}