import { useRef } from "react";
import Navbar from "../Components/Navbar";
import '../Styles/Calendar.css'
import { db, auth } from "../firebase";
import { query, collection, getDocs, where, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

export default function Calendar() {

    const link = useRef();
    const [links, setLinks] = useState([])
    const [currUser, loading] = useAuthState(auth);
    const [user, setUser] = useState("")

    const submit = async () => {
        if (loading)
            return;

        if (link.current.value === '')
            return;

        if (loading)
            return;
        try {
            const q = query(
                collection(db, 'users'),
                where('uid', '==', currUser?.uid)
            );
            const theDoc = await getDocs(q);
            setUser(theDoc.docs[0].id)
            let newLinks = [...links, link.current.value]
            if (newLinks.length <= 5) {
                await updateDoc(doc(db, 'users', theDoc.docs[0].id), { iCalLinks: newLinks })
                setLinks(newLinks)
            } else {
                alert("Only 5 iCal links allowed.")
            }
            link.current.value = ''

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                const q = query(
                    collection(db, 'users'),
                    where('uid', '==', currUser?.uid)
                );
                const userDoc = await getDocs(q);
                // return userDoc.docs[0].id;
                await setUser(userDoc.docs[0].id)


            } catch (err) {
                return;
            }
        }

        const func = async () => {
            await getUser();
            if (user !== '') {
                const q = query(collection(db, "users"), where('uid', '==', currUser?.uid));
                const userDoc = await getDocs(q)

                const unsub = onSnapshot(doc(db, "users", userDoc.docs[0].id), (doc) => {
                    setLinks(doc.data().iCalLinks)
                })
            }
        }

        func();

    }, [currUser, user])

    return (
        <div>
            <Navbar title="Calendar" />
            <div className="calendar-holder">
                <h1>Import Calendar</h1>
                <form onSubmit={(e) => { e.preventDefault(); submit() }}>
                    <h3>Import events from another calendar using an iCal Link</h3>
                    <input type="text" ref={link} placeholder="iCal link" />
                    <button type="submit">Submit</button>
                </form>
                <div className="links-holder">
                    {links.map((value, index) => <p onClick={async () => {
                        console.log(index)
                        let newArr = [...links]
                        newArr.splice(index, 1)
                        await setLinks(newArr)
                        await updateDoc(doc(db, 'users', user), { iCalLinks: newArr })
                    }}>{value}</p>)}
                </div>
            </div>
        </div>


    )
}










