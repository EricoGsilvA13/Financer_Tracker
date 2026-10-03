import enum
from datetime import datetime
from typing import List
from sqlalchemy import String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.base import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.receitas import Receita
    from app.models.despesas import Despesa

class TipoCategoria(enum.Enum):
    RECEITA = "receita"
    DESPESA = "despesa"


class Categoria(Base):
    __tablename__ = "categorias"

    id: Mapped[int] = mapped_column(primary_key=True)
    nome: Mapped[str] = mapped_column(String(80), unique=True)
    tipo: Mapped[TipoCategoria] = mapped_column()
    data_criacao: Mapped[datetime] = mapped_column(server_default=func.now())

    receitas: Mapped[List["Receita"]] = relationship(back_populates="categoria")
    despesas: Mapped[List["Despesa"]] = relationship(back_populates="categoria")