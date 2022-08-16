from flask import Flask, request, render_template
import Utilities
import json
import iCal
import os
from os import mkdir, path

app = Flask(__name__)

link = []


@app.route("/rssFeed")
def rssFeed(link="http://rss.cnn.com/rss/cnn_world.rss"):
    feed = json.dumps(Utilities.get_rss_news_data(link), indent=4)
    print(feed)
    return feed


@app.route('/getLink', methods=["POST"])
def getLink():
    output = json.loads(request.data)
    link.append(output["link"])
    return output

@app.route('/addCalendar', methods=["POST"])
def addCalendar():
    output = json.loads(request.data)
    return iCal.addCalendars(output['user'])

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