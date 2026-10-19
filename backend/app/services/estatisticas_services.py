from sqlalchemy.orm import Session
from sqlalchemy import func
from decimal import Decimal
from app.models.despesas import Despesa
from app.models.receitas import Receita
from app.models.categorias import Categoria
from app.schemas.estatisticas import SaldoAtualSchemaResponse, TotaisporCategoriaSchemaResponse


class EstatisticaService():
    def _calcular_total_despesas(self, db: Session):

        total_despesas = db.query(func.sum(Despesa.valor)).scalar()
        if total_despesas is None:
            return Decimal('0')

        return total_despesas

    def _calcular_total_receitas(self, db: Session):

        total_receitas = db.query(func.sum(Receita.valor)).scalar()
        if total_receitas is None:
            return Decimal('0')

        return total_receitas
    
    def calcular_saldo(self, db: Session):

        total_despesas = self._calcular_total_despesas(db)
        total_receitas = self._calcular_total_receitas(db)
        saldo = total_receitas - total_despesas

        return SaldoAtualSchemaResponse(
            total_despesas=total_despesas,
            total_receitas=total_receitas,
            saldo_atual=saldo
        )

    def calcular_total_receitas_por_categoria(self, db: Session):
        
        resultado = db.query(Categoria.nome,func.sum(Receita.valor)).join(Receita,Receita.categoria_id == Categoria.id).group_by(Categoria.nome).all()
        
        return [TotaisporCategoriaSchemaResponse(
            categoria=nome,
            total=total
        )
            for nome, total in resultado
        ]

    def calcular_total_despesas_por_categoria(self, db: Session):

        resultado = db.query(Categoria.nome,func.sum(Despesa.valor)).join(Despesa,Despesa.categoria_id == Categoria.id).group_by(Categoria.nome).all()

        return [TotaisporCategoriaSchemaResponse(
            categoria=nome,
            total=total
        )
            for nome, total in resultado
        ]

    def calcular_total_receitas(self, db: Session):

        total_receitas = self._calcular_total_receitas(db)

        return total_receitas
    
    def calcular_total_despesas(self, db: Session):
        
        despesa_total = self._calcular_total_despesas(db)

        return despesa_total