import requests
from datetime import datetime, timedelta
import icalendar
import recurring_ical_events

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from os import walk

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


def add_to_db(events, docID):
    
    try:
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
            print(name + str(day))

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

            db.collection("users").document(docID).collection("events").document(
                f'iCal {name} ON {start} AT {start_time}').set(data)
        return True
    except Exception as e:
        print(e)
        return False

def read_ical(url, docID):
    today = datetime.now()
    start = (today.year, today.month, today.day)
    ending = datetime.now() + timedelta(days=10)
    end = (ending.year, ending.month, ending.day)

    try:
        cal = icalendar.Calendar.from_ical(requests.get(url).text)
        events = recurring_ical_events.of(cal).between(start, end)
        add_to_db(events, docID)
    except:
        print("invalid link")


def read_ics(file_name, docID):
    today = datetime.now()
    start = (today.year, today.month, today.day)
    ending = datetime.now() + timedelta(days=10)
    end = (ending.year, ending.month, ending.day)

    try:
        file = open(file_name, "rb")
        cal = icalendar.Calendar.from_ical(file.read())
        events = recurring_ical_events.of(cal).between(start, end)
        add_to_db(events, docID)
    except Exception as e:
        print(e)


def addCalendars(docID):

    docRef = db.collection("users").document(docID)

    doc = docRef.get()

    if (doc.exists):
        links = doc.to_dict()['iCalLinks']
        for link in links:
            print("hi")
            added = add_to_db(link, docID)
            if (added == False):
                print("err")

    filenames = next(walk("../icsFiles"), (None, None, []))[2]
    icsFiles = []
    for file in filenames:
        if file[file.rindex("."):] == '.ics':
            icsFiles.append("../icsFiles/" + file)

    for file in icsFiles:
        read_ics(file, docID)
        

    return "<h1> TESTING </h1>"
