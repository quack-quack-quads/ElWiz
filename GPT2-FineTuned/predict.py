import gpt_2_simple as gpt2
import tensorflow as tf
from flask import Flask, jsonify,request, g 
from flask_cors import CORS, cross_origin
import csv
import re
import random
import json

# gpt2.download_gpt2(model_name="124M")

code_map = {}
codePref_map = {}
code_Details = {}


def parsePref(s):
    s = s.replace(" ", "")
    s = s.replace("\n", "")
    s = s.replace("\t", "")
    pref = ""
    for s in re.findall('([a-zA-Z ]*)\d*.*',s):
        pref += s
    # print("Parse pref")
    return pref

def load_codes():
    with open("code.csv", "r", encoding="ISO-8859-1") as f:
        csvFile = csv.reader(f)
        for lines in csvFile:
            if len(lines) != 0:
                code_map[lines[1]] = lines[2]
                code = lines[1]
                pref = parsePref(code)
                try:
                    codePref_map[pref].append(lines[2])
                except:
                    codePref_map[pref] = [lines[2]]
    with open("all_prerequisites.json") as jsonF:
        data = json.load(jsonF)
        for el in data:
            # print(el)
            pre = parsePref(el)
            try:
                code_Details[pre].append(data[el]["description"])
            except:
                try:
                    code_Details[pre] = [data[el]["description"]]
                except:
                    continue
load_codes()

def predict(sentence, length, samples):
    tf.compat.v1.reset_default_graph()
    sess = gpt2.start_tf_sess()
    gpt2.load_gpt2(sess, reuse=tf.compat.v1.AUTO_REUSE)
    print("model loaded!")
    
    ans = gpt2.generate(sess,length=length,
              temperature=0.8,
              prefix=sentence,
              nsamples=samples,
              batch_size=1,
              top_k = 10,
              return_as_list=True
              )
    return ans

# print(predict("CSE181 CHEM40C BIBC102 PHYS120 MATH109", 10, 1))

app = Flask(__name__)
@app.route("/predict", methods=['POST'])
@cross_origin()
def fun():
    # print("Called")
    if request.method == 'POST':
        sentence = request.form['sentence']
        sentence = str(sentence)
        # print(sentence)
        ret = []
        
        while len(ret) == 0:
            results = predict(sentence,20,1)
            results = results[0].split(" ")
            # print(type(results))
            
            for i in range(len(results)):
                # print(i,results[i])
                if i >= 5:
                    if results[i]!=" " and results[i] != "":
                        ret.append(results[i])
                        
        
        # print(ret)
        data = []
        for el in ret:
            course = ""
            details = ""
            try:
                course = code_map[el]
            except:
                pref = ""
                for s in re.findall('([a-zA-Z ]*)\d*.*',el):
                    pref += s
                # print(pref)
                try:
                    course = codePref_map[pref][(random.randint(1,1000000))%(len(codePref_map[pref]))]
                except:
                    continue
                try:
                    details = code_Details[pref][(random.randint(1,1000000))%(len(code_Details[pref]))]
                except:
                    continue
            # print(details)
            details = details.replace("\n", " ")
            details = details.replace("\t", " ")
            obj = {
                "Code" : el.replace("\n", ""),
                "Course" : course,
                "Details" : details
            }
            flag = 0
            for el2 in data:
                if (el2["Code"] == obj["Code"]):
                    flag = 1
                
            # print(obj)
            if (flag == 0): data.append(obj)
        return json.dumps(data)
    
if __name__ == '__main__':
    # print(code_Details)
    app.run(threaded=False)