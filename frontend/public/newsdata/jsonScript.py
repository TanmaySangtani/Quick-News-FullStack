import json

category = "general"

f = open('demo.json')
  
# returns JSON object as 
# a dictionary
data = json.load(f)

new_data = []
for i in data:
    temp_dict = {}
    temp_dict["title"] = i["title"]
    temp_dict["description"] = i["description"]
    temp_dict["newsUrl"] = i["url"]
    temp_dict["imageUrl"] = i["urlToImage"]
    temp_dict["source"] = i["source"]["name"]
    temp_dict["publishedAt"] = i["publishedAt"]
    temp_dict["category"] = category

    new_data.append(temp_dict)

with open("experimentalimports.json", "w") as json_file2:
    json.dump(new_data, json_file2)    