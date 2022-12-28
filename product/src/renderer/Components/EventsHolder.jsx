// this file is for holding all of the events
import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, onSnapshot, where, getDocs, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import Event from "./Event";
import '../Styles/Event.css'

export default function EventsHolder() {

  const [currUser] = useAuthState(auth)
  const [events, setEvents] = useState([])
  const [user, setUser] = useState('')
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


  useEffect(() => {

    const getUser = async () => {
      if (currUser == null) {
        return;
      }
      try {
        const q = query(
          collection(db, 'users'),
          where('uid', '==', currUser?.uid)
        );
        const userDoc = await getDocs(q);
        setUser(userDoc.docs[0].id)


      } catch (err) {
        console.log(err);
        // alert('An error had occurred while fetching the users name');
        return;
      }
    }


    const usr = async () => {
      await getUser();
      if (user !== '') {
        const q = query(collection(db, 'users', user, 'events'), orderBy("day"))
        const unsub = onSnapshot(q, (querySnapshot) => {
          let eventsArr = []
          querySnapshot.forEach(async event => {

            let data = event.data();
            let time = data.day.toDate().toLocaleTimeString()
            let timeStr = time.substring(0, time.lastIndexOf(':')) + time.substring(time.lastIndexOf(' '))

            let dur = data.duration;


            eventsArr.push({ name: data.name, details: data.details, day: data.day.toDate(), start_time: timeStr, duration: dur, docID: event.id, user: user, end: data.end.toDate() })

          })

          setEvents(eventsArr)
        })
        return () => unsub;
      }
    }

    usr();


  }, [user, currUser])

  return (
    <div className="events-component">
      <h1 className="events-title">{events.length === 0 ? "" : ""}</h1>
      <div className="events-holder">
        {events.map((event, i) => <div className="event-wrapper" key={"wrapper " + i}>{(i == 0 || events[i].day.getDate() !== events[i - 1].day.getDate()) ? <p style={{ fontSize: '30px', width: '90%' }} className="date" key={"Date " + i} >{days[event.day.getDay()] + ", " + months[event.day.getMonth()].toLowerCase() + " " + event.day.getDate()} <hr></hr></p> : " "}<Event event={event} key={i} /></div>)
        }
      </div>
    </div>

  )

}
