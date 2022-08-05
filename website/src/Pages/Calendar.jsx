import { useRef } from "react";
import Navbar from "../Components/Navbar";
import '../Styles/Calendar.css'
import { db, auth } from "../firebase";
import { query, collection, getDocs, where, updateDoc, doc } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function Calendar() {

    const link = useRef();
    const [currUser, loading] = useAuthState(auth);
    let userDoc;

    const getUser = async () => {
        if (loading)
            return;
        try {
            const q = query(
                collection(db, 'users'),
                where('uid', '==', currUser?.uid)
            );
            const theDoc = await getDocs(q);
            await updateDoc(doc(db, 'users', theDoc.docs[0].id), { iCalLink: link.current.value })

        } catch (e) {
            // alert("Error: Could not get user doc.")
            console.log(e)
        }
    }

    const submit = async () => {
        if (loading)
            return;
        console.log(userDoc)
    }

    return (
        <>
            <Navbar title="Calendar" />
            <div className="calendar-holder">
                <h1>Import Calendar</h1>
                <form onSubmit={(e) => { e.preventDefault(); getUser() }}>
                    <h3>Import events from another calendar using an iCal Link</h3>
                    <input type="text" ref={link} placeholder="iCal link" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>


    )
}










