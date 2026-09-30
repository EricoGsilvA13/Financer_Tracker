from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = ("mysql+pymysql://root:senha@localhost/finance_tracker")

engine = create_engine(DATABASE_URL)

Sessionlacal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)
