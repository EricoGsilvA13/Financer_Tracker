from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, String, CheckConstraint, Numeric, func
from decimal import Decimal
from datetime import datetime, date
from app.database.base import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.usuarios import Usuario
    from app.models.categorias import Categoria

class Despesa(Base):
    __tablename__ = "despesas"

    id: Mapped[int] = mapped_column(primary_key=True)
    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"))
    categoria_id: Mapped[int] = mapped_column(ForeignKey("categorias.id"))
    descricao: Mapped[str] = mapped_column(String(150))
    valor: Mapped[Decimal] = mapped_column(Numeric(precision=10, scale=2), CheckConstraint("valor > 0"))
    data_criacao: Mapped[datetime] = mapped_column(server_default=func.now())
    data_movimentacao: Mapped[date] = mapped_column()

    usuario: Mapped["Usuario"] = relationship(back_populates="despesas")
    categoria: Mapped["Categoria"] = relationship(back_populates="despesas")