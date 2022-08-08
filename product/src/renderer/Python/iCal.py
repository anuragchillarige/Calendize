import requests
from datetime import datetime, timedelta
import icalendar
import recurring_ical_events

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


def addToDB(url, docID):
    today = datetime.now()
    start = (today.year, today.month, today.day)
    ending = datetime.now() + timedelta(days=10)
    end = (ending.year, ending.month, ending.day)

    try:
        cal = icalendar.Calendar.from_ical(requests.get(url).text)
        events = recurring_ical_events.of(cal).between(start, end)

        for event in events:
            name = str(event['SUMMARY'])
            description = str(event['DESCRIPTION'])
            if (description.__contains__('To see detailed information for automatically created events like this one, use the official Google Calendar app.')):
                description = ""
            start = event['DTSTART'].dt
            start_time = start.strftime("%H:%M")
            duration = str(event['DTEND'].dt - start)

            day = event['DTSTART'].dt
            end = event['DTEND'].dt

            data = {
                "day": day,
                "duration": {
                    "hours": duration[0: duration.index(":")],
                    "mins": duration[duration.index(":") + 1: duration.rindex(":")]
                },
                "start_time": start_time,
                "name": name,
                "details": description,
                "end": end
            }

            db.collection("users").document(docID).collection("events").document(f'iCal {name} ON {start} AT {start_time}').set(data)
            return True
    except:
        return False;

def addCalendars(docID):

    docRef = db.collection("users").document(docID)

    doc = docRef.get()

    if (doc.exists):
        links = doc.to_dict()['iCalLinks']
        for link in links:
            added = addToDB(link, docID)
            if (added == False):
                return "ERROR!"
    else:
        return "ERROR!"

    return "<h1> TESTING </h1>"