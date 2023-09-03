import json
import requests
from api.classes.items.context import Context
import openai

class Inference :

    def __init__ (self, user_question) :

        object_context = Context (user_question)
        context = object_context.query ()
        self.chat = [
            {"role": "system", "content": f"You are a helpful medical assistant, friendly, respectful and you reply with the following context to the user question: {context}."},
            {"role": "user", "content": user_question},
        ]

        lines = []
        with open ("./api/token/token.txt") as file :
            for line in file :
                lines.append (line)
        self.key = lines[1].rstrip ('\n')

    def query (self):
        openai.api_key = self.key
        Messages = self.chat
        response = openai.ChatCompletion.create (
            model="gpt-3.5-turbo", 
            messages = Messages,
            max_tokens = 512  
        )

        return response['choices'][0]['message']['content']
