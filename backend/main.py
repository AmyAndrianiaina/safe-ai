import schemas.index as schemas
import models.index as models
import ai_model_api.api as api
from config.database import Base, engine, SessionLocal
from fastapi import FastAPI, Depends, HTTPException,status
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(engine)
def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
app=FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/register")
def register_user(olona: schemas.Register, session: Session = Depends(get_session)):
    existing_user = session.query(models.Olona).filter_by(email=olona.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already used")

    new_olona = models.Olona(nom=olona.nom, prenom=olona.prenom, cin=olona.date_de_naissance, date_de_naissance=olona.date_de_naissance, email=olona.email, password=olona.password)

    session.add(new_olona)
    session.commit()
    session.refresh(new_olona)

    return schemas.Info(access_token="token", token_type="Bearer", expires_in=3600, user=schemas.User(name=olona.nom, email=olona.email))

@app.post("/login")
def register_user(olona: schemas.Login, session: Session = Depends(get_session)):
    existing_user = session.query(models.Olona).filter_by(email=olona.email, password=olona.password).first()
    if existing_user:
        return schemas.Info(access_token="token", token_type="Bearer", expires_in=3600, user=schemas.User(name=existing_user.nom, email=olona.email))
    else:
        raise HTTPException(status_code=401, detail="wrong credentials")
    
@app.post("/logout")
def register_user():
    return schemas.Logout(message="Successfully logged out")
    
@app.post("/chat")
def register_user(chat: schemas.Chat):
    return {"output":api.Api.getOutput(chat.input)}
    