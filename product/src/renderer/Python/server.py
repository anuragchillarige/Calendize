from copyreg import constructor
from flask import Flask, request, render_template, url_for, abort
import Utilities
import json
import iCal
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOADFOLDER = os.path.join(os.getcwd(), './icsFiles')
app.config['UPLOADFOLDER'] = UPLOADFOLDER
addedFile = False
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


@app.route("/ics", methods=['POST', 'GET'])
def ics():

    if 'file' not in request.files:
        return ('err', 404)
    file = request.files['file']
    if file.filename == '':
        return ('', 204)
    if file and file.filename.rsplit('.', 1)[1].lower() == 'ics':
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOADFOLDER'], filename))
        addedFile = True
        return ('', 204)


if __name__ == "__main__":
    # try:
    #     os.system("mkdir Calendize")
    # except:
    #     pass
    # os.system("cd Calendize; open ElectronReact.app")
    app.run(debug=True)
