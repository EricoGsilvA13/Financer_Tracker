from app.models.receitas import Receita
from app.models.categorias import Categoria
from app.models.usuarios import Usuario
from app.schemas.receitas import ReceitaSchemaCreate
from sqlalchemy.orm import Session
from fastapi import HTTPException

class ReceitaService:
    def _obter_receita_por_id(self, db: Session, receita_id: int):

        receita = db.query(Receita).filter(Receita.id == receita_id).first()
        if not receita:
            raise HTTPException (status_code=404, detail="Receita não existe")

        return receita

    def _obter_usuario_por_id(self, db: Session, usuario_id: int):

        usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
        if not usuario:
            raise HTTPException (status_code=404, detail="Usuário não existe")

        return usuario

    def _obter_categoria_por_id(self, db: Session, categoria_id: int):

        categoria = db.query(Categoria).filter(Categoria.id == categoria_id).first()
        if not categoria:
            raise HTTPException (status_code=404, detail="Categoria não existe")

        return categoria
    
    def criar_receita(self, db: Session, receita_schema: ReceitaSchemaCreate):

        if receita_schema.valor <= 0:
            raise HTTPException (status_code=422, detail="Valor não pode se menor ou igual a R$ 0,00")

        self._obter_usuario_por_id(db, receita_schema.usuario_id)
        self._obter_categoria_por_id(db, receita_schema.categoria_id)


        receita = Receita(
            valor=receita_schema.valor,
            descricao=receita_schema.descricao,
            usuario_id=receita_schema.usuario_id,
            categoria_id=receita_schema.categoria_id,
            data_movimentacao=receita_schema.data_movimentacao
        )

        db.add(receita)
        db.commit()
        db.refresh(receita)

        return receita

    def listar_receitas(self, db: Session):

        receitas = db.query(Receita).all()

        return receitas

    def buscar_receita_por_id(self, db: Session, receita_id: int):

        receita = self._obter_receita_por_id(db, receita_id)

        return receita

    def atualizar_receita(self, db: Session, receita_id: int, receita_schema: ReceitaSchemaCreate):

        receita = self._obter_receita_por_id(db, receita_id)

        if receita_schema.valor <= 0:
            raise HTTPException (status_code=422, detail="Valor não pode menor ou igual R$ 0,00")
        
        self._obter_usuario_por_id(db, receita_schema.usuario_id)
        self._obter_categoria_por_id(db, receita_schema.categoria_id)

        receita.valor=receita_schema.valor
        receita.descricao=receita_schema.descricao
        receita.data_movimentacao=receita_schema.data_movimentacao
        receita.usuario_id=receita_schema.usuario_id
        receita.categoria_id=receita_schema.categoria_id

        db.commit()
        db.refresh(receita)

        return receita

    def excluir_receita(self, db: Session, receita_id):

        receita = self._obter_receita_por_id(db, receita_id)

        db.delete(receita)
        db.commit()

        return {"message": "Receita excluida com sucesso"}