from ics import Calendar 
import requests
from datetime import datetime
from dateutil import tz

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

def addToDB(url):
    cal = Calendar(requests.get(url).text)

    today = datetime.now()

    events = cal.events
    addedEvents = 0

    for x in events:
        if(today < x.end.datetime.replace(tzinfo=None) and addedEvents < 10):

            time = str(x.begin.datetime.replace(tzinfo=tz.tzutc()).astimezone(tz.tzlocal()).time()) 
            time = time[0:time.rfind(":")]
            
            duration = str(x.duration)
            duration = duration[0:duration.rfind(":")]

            data = {
                "day": x.begin.datetime.replace(tzinfo=tz.tzutc()).astimezone(tz.tzlocal()),
                "details": x.description,
                "name": x.name,
                "duration": {
                    "hours": duration[0: duration.index(":")],
                    "mins": duration[duration.index(":") + 1]
                },
                "start_time": time,
            }

            db.collection("users").document("iDXc7ggQLMSVbZmfavno").collection("events").add(data)
            addedEvents += 1

urls = ['https://calendar.google.com/calendar/ical/pinganurag%40gmail.com/private-8d6688faf4d85816c9e261705bc60fdf/basic.ics']

for link in urls:
    addToDB(link)
