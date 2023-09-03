from api.classes.inference import Inference

def api (user_question) :

    response = Inference (user_question)
    return response.query ()