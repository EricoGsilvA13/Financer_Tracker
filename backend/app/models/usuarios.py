from datetime import datetime
from sqlalchemy import String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List
from app.database.base import Base
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.receitas import Receita
    from app.models.despesas import Despesa



class Usuario(Base):
    __tablename__ = "usuarios"

    id: Mapped[int] = mapped_column(primary_key=True)
    nome: Mapped[str] = mapped_column(String(80))
    email: Mapped[str] = mapped_column(String(200), unique=True)
    senha_hash: Mapped[str] = mapped_column(String(280))
    data_criacao: Mapped[datetime] = mapped_column(server_default=func.now())

    receitas: Mapped[List["Receita"]] = relationship(back_populates="usuario")
    despesas: Mapped[List["Despesa"]] = relationship(back_populates="usuario")