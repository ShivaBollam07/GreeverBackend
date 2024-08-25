data = {
    "education_id": None,
    "age": 25,
 
}

temp = ""

for i in data:
    if data[i] is not None:
        temp += f"{i} = '{data[i]}' ? "


temp = temp[:-3].replace("?", "and")

query = f"UPDATE EducationDetails set {temp} WHERE education_id = $8 AND user_id = $9"



print(query)