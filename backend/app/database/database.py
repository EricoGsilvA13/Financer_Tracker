from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

database_URL = ("mysql+pymysql://root:senha@localhost/finance_tracker")

engine = create_engine(database_URL)

Sessiolacal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)
