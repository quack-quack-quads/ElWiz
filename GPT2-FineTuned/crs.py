import json
with open("all_prerequisites.json") as f:
    data = json.load(f)

f2 = open("file.txt", "a", encoding="utf-8")
for el in data:
    try:
        el = el.replace("'", "")
        data[el]["name"] = data[el]["name"].replace("'", "")
        data[el]["description"] = data[el]["description"].replace("'", "")
        s = "( '" + el + "' , '" + data[el]["name"] + "', '" + data[el]["description"] + "' ),"
        f2.write(s)
    except:
        continue
