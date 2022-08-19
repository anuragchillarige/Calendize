<<<<<<< HEAD:product/src/renderer/Python/server.py
from crypt import methods
from flask import Flask, request, render_template, jsonify
import Utilities
import json
import firebaseUtilities as fb
import time
=======
from flask import Flask, request, render_template
import Utilities
import json
import iCal
import os
from os import mkdir, path
>>>>>>> 2a3ef9ec35917d2654a298e1eda16bc1677fc084:product/assets/Python/server.py

news = []
uid = []
app = Flask(__name__)


@app.route('/getLink', methods=["POST"])
def getLink():
    output = json.loads(request.data)
    return output


@app.route('/addCalendar', methods=["GET", "POST"])
def addCalendar():
    output = json.loads(request.data)
    return fb.addCalendars(output['user'])


@app.route('/readRssLinks', methods=["GET", "POST"])
def readRssLink():
    output = json.loads(request.data)
    links = fb.readRssLinks(output['user'])
    news = []
    num = 0
    for i in links:
        news.append(
            Utilities.get_rss_news_data(i))
        num += 1
    # final_news = json.dumps(news)
    response = jsonify(news)
    print(news)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


# @app.route("/getFeed")
# def getFeed():
#     print(news)
#     return news


@app.route('/')
def home():
    return render_template('index.html')

@app.route("/test")
def test():
    return "testing!"


if __name__ == "__main__":
    try:
        os.system("mkdir Calendize")
    except:
        pass;
    os.system("cd Calendize; open ElectronReact.app")
    app.run(debug=True)