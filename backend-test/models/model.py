from config.database import Base
from sqlalchemy import Column, Integer, String, Date

class Olona(Base):
    __tablename__ = 'olonas'
    id = Column(Integer, primary_key=True)
    nom = Column(String(255), nullable=True)
    prenom = Column(String(255), nullable=True)  
    cin = Column(String(255), nullable=True)
    date_de_naissance = Column(Date, nullable=True)
    email = Column(String(255), nullable=True)
    password = Column(String(255), nullable=True)