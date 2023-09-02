import openai
import os

API_KEY = open("API_KEY", "r").read()

openai.api_key = API_KEY

completion = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "system", "content": "You are a medical assistant."},
    {"role": "user", "content": "I hvae a severe fever"}
  ],
  max_tokens=60
)

print(completion.choices[0].message)