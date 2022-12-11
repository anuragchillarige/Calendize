import { useCallback, useState } from "react";
import { SelectDatepicker } from "react-select-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../Styles/EventInput.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { collection, where, query, getDocs, addDoc } from "firebase/firestore";
import { reload } from "firebase/auth";


export default function Input() {

    const [currUser] = useAuthState(auth);

    const [name, setName] = useState("")
    const [details, setDetails] = useState("")
    const [day, setDay] = useState(new Date());
    const onDateChange = useCallback((dateIn) => {
        setDay(dateIn);
    }, [])
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    async function submitData(e) {
        const today = new Date()
        today.setHours(0)
        today.setMinutes(0)
        e.preventDefault();
        setName(name.trim());
        setDetails(details.trim());

        let startDate = new Date(day.toDateString() + ' ' + startTime);
        let endDate = new Date(day.toDateString() + ' ' + endTime);

        console.log(startDate);
        console.log(endDate);

        let valid = true;

        if (name === '') {
            valid = false;
        }

        if (startTime == null || startTime == undefined || endTime == null || endTime == undefined) {
            valid = false;
        }

        if (startDate > endDate) {
            valid = false;
        }

        if (startDate < new Date()) {
            valid = false;
        }
        if (today > day) {
            valid = false;
        }

        if (valid === true) {
            // submit form 

            let durationMins = (endDate.getTime() - startDate.getTime()) / (1000 * 60);
            let durationHrs = Math.floor(durationMins / 60);
            durationMins %= 60;

            let duration = {
                hours: durationHrs,
                mins: durationMins
            }
            const eventObject = {
                name: name,
                details: details,
                day: day,
                start_time: startTime,
                end_time: endTime,
                duration: duration,
                end: endDate
            }

            try {
                const q = query(
                    collection(db, 'users'),
                    where('uid', '==', currUser?.uid)
                );
                const userDoc = await getDocs(q);
                const docID = userDoc.docs[0].id;

                try {
                    await addDoc(collection(db, "users", docID, "events"), eventObject);
                } catch (err) {
                    alert('An error occured in adding the event.')
                }

            } catch (err) {
                alert('An error had occurred while fetching the users name');
                return;
            }


            const invalid = document.querySelector(".invalidData");
            invalid.style.display = 'none';

        } else {
            if (name === '') {
                const nameElement = document.querySelector("#eventName");
                nameElement.style.border = '2px solid red'
            }

            if (today > day) {
                const dateElement = document.querySelector(".datePicker")
                dateElement.style.border = '2px solid red'
            }

            if (startDate > endDate || startDate < new Date()) {
                const startElement = document.querySelector("#startTime");
                startElement.style.border = '2px solid red';
            }

            const invalid = document.querySelector(".invalidData");
            invalid.style.display = 'block';
        }
    }

    function setDefaultBorder(e) {
        e.target.style.border = "1px solid rgba(0, 0, 0, 0.2)";
    }


    return (
        <div className="event-holder-box">
            <label className="header">
                Add
            </label>
            <form action="" onSubmit={e => submitData(e)} className="event-input">
                <input type="text" onChange={e => { e.preventDefault(); setName(e.target.value); setDefaultBorder(e) }} className="event name" id="eventName" placeholder="Title" />
                <textarea className="event details" onChange={e => { e.preventDefault(); setDetails(e.target.value); setDefaultBorder(e) }} placeholder="Details"></textarea>

                <div className="selectDate-holder">
                    <label>Select Date:</label>
                    <DatePicker selected={day} onChange={day => {
                        setDay(day);
                        const dateElement = document.querySelector(".datePicker")
                        dateElement.style.border = 'none'
                    }} name="Date" className="datePicker" />
                </div>

                <div className="event timings">
                    <label htmlFor="start-time">Start time:</label>
                    <input type="time" name="start-time" onChange={e => { e.preventDefault(); setStartTime(e.target.value); setDefaultBorder(e) }}
                        className="event time" id="startTime" />
                    <label htmlFor="end-time">End time:</label>
                    <input name="end-time" type="time" id="end-time" min="0" placeholder="Hours"
                        onChange={e => { e.preventDefault(); setEndTime(e.target.value); setDefaultBorder(e) }} />
                </div>

                <button className="submitButton" type="submit">Add</button>
                <p className="invalidData">Error: Invalid Data!</p>
            </form>
        </div>

    )
}