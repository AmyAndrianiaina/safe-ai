import os

def take_text () :
    text_list = []
    directory = "./api/text_data"
    for file in os.listdir (directory) :
        file_path = os.path.join (directory, file)
        with open (file_path, 'r') as file :
            text_list.append (file.read ())

    return text_list