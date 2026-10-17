from app.models.despesas import Despesa
from app.models.categorias import Categoria
from app.models.usuarios import Usuario
from app.schemas.despesas import DespesaSchemaCreate
from sqlalchemy.orm import Session
from fastapi import HTTPException

class DespesasService:
    def _obter_despesa_por_id(self, db: Session, despesa_id: int):

        despesa = db.query(Despesa).filter(Despesa.id == despesa_id).first()
        if not despesa:
            raise HTTPException (status_code=404, detail="Despesa não existe")

        return despesa

    def _obter_usuario_por_id(self, db: Session, usuario_id: int):

        usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
        if not usuario:
            raise HTTPException (status_code=404, detail="Usuario não existe")

        return usuario

    def _obter_categoria_por_id(self, db: Session, categoria_id: int):

        categoria = db.query(Categoria).filter(Categoria.id == categoria_id).first()
        if not categoria:
            raise HTTPException (status_code=404, detail="Categoria não existe")

        return categoria

    def criar_despesa(self, db: Session, despesa_schema: DespesaSchemaCreate):

        if despesa_schema.valor <= 0:
            raise HTTPException (status_code=422, detail="Valor não pode ser menor ou igula a R$ 0,00")

        self._obter_usuario_por_id(db, despesa_schema.usuario_id)
        self._obter_categoria_por_id(db, despesa_schema.categoria_id)

        despesa = Despesa(
            valor=despesa_schema.valor,
            descricao=despesa_schema.descricao,
            data_movimentacao=despesa_schema.data_movimentacao,
            categoria_id=despesa_schema.categoria_id,
            usuario_id=despesa_schema.usuario_id
        )

        db.add(despesa)
        db.commit()
        db.refresh(despesa)

        return despesa

    def listar_despesas(self, db: Session):

        despesas = db.query(Despesa).all()

        return despesas

    def buscar_despesa_por_id(self, db: Session, despesa_id: int):

        despesa = self._obter_despesa_por_id(db, despesa_id)

        return despesa

    def atualizar_despesa(self, db: Session, despesa_id: int, despesa_schema: DespesaSchemaCreate):

        despesa = self._obter_despesa_por_id(db, despesa_id)

        if despesa_schema.valor <= 0:
            raise HTTPException (status_code=422, detail="Valor não pode ser menor ou igual a R$ 0,00")

        self._obter_usuario_por_id(db, despesa_schema.usuario_id)
        self._obter_categoria_por_id(db, despesa_schema.categoria_id)

        despesa.valor=despesa_schema.valor
        despesa.descricao=despesa_schema.descricao
        despesa.data_movimentacao=despesa_schema.data_movimentacao
        despesa.usuario_id=despesa_schema.usuario_id
        despesa.categoria_id=despesa_schema.categoria_id
        

        db.commit()
        db.refresh(despesa)

        return despesa

    def excluir_despesa(self, db: Session, despesa_id: int):

        despesa = self._obter_despesa_por_id(db, despesa_id)

        db.delete(despesa)
        db.commit()

        return {"message": "Despesa excluida com sucesso"}