import { deleteDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import '../Styles/Event.css'

export default function Event(props) {
  let delInterval = setInterval(() => { }, 1000)
  const del = async (e) => {
    console.log("in delete method!")
    clearInterval(delInterval)
    await deleteDoc(
      doc(db, 'users', props.event.user, 'events', props.event.docID)
    );
  };

  let deleted = false;
  delInterval = setInterval(async () => {
    const today = new Date();
    if (!deleted && today > props.event.end) {
      await del(props.event.docID);
      deleted = true
    }
  }, 2000)


  return (
    <>
      <div className="event" style={{ borderColor: `rgb(${Math.floor(Math.random() * 255 + 35)}, ${Math.floor(Math.random() * 255 + 35)}, ${Math.floor(Math.random() * 255 + 35)})` }} >
        <p>{props.event.name}</p>
        <p>{props.event.details}</p>
        <p>{props.event.start_time}</p>
        <p>{props.event.duration.hours} {props.event.duration.hours === "1" ? "Hr" : "Hrs"} {props.event.duration.mins}  {props.event.duration.mins === "1" ? "Min" : "Mins"}</p>
      </div >
    </>

  );
}
