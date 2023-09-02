from pydantic import BaseModel
from datetime import date

class Register(BaseModel):
    nom:str
    prenom:str
    cin:str
    date_de_naissance:date
    email:str
    password:str

class Login(BaseModel):
    email:str
    password:str

class Chat(BaseModel):
    input:str

class User(BaseModel):
    name:str
    email:str

class Info(BaseModel):
    access_token:str
    token_type:str
    expires_in:int
    user:User

class Logout(BaseModel):
    message:str