import requests
import json
from api.classes.items.tools.text_taker import take_text

class Context :
    
    def __init__ (self, user_question) :

        self.contexts = take_text ()
        sentences = take_text ()
        payload = {
            "inputs": {
                "source_sentence": user_question,
                "sentences": sentences,
            }
        }
        self.data = json.dumps(payload)
        self.API_URL = "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2"

        lines = []
        with open ("./api/token/token.txt") as file :
            for line in file :
                lines.append (line)
        key = lines[0].rstrip ('\n')
        self.headers = {"Authorization": f"Bearer {key}"}
    
    def query (self) :
        response = requests.request("POST", self.API_URL, headers=self.headers, data=self.data)
        score = json.loads(response.content.decode("utf-8"))
        return self.contexts[score.index(max(score))]
    
    

