import { useRef } from "react";
import Navbar from "../Components/Navbar";
import '../Styles/News.css'
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


            <div className="rssPage-holder">
                <div className="link-submit-holder">
                    <form onSubmit={(e) => { e.preventDefault(); submit() }}>
                        <h1 className="rssLinkTitle">Import iCal Links
                            <h3>Import events from another calendar using an iCal Link
                            </h3>
                        </h1>

                        <input className="input-rss" type="url" ref={link} placeholder="iCal link" />
                        <button className="rss-submit" type="submit">Submit</button>
                    </form>
                </div>

                <div className="outside">
                    <div className="temp-div">
                        iCal Links
                    </div>

                    <div className="rss-housing">
                        {links.map((value, index) =>
                            <div className="link-holder" key={index}>
                                <h3>{value}</h3>
                                <i class="bi bi-trash3" onClick={async () => {
                                    let newArr = [...links]
                                    newArr.splice(index, 1)
                                    await setLinks(newArr)
                                    await updateDoc(doc(db, 'users', user), { iCalLinks: newArr })
                                }}></i>
                            </div>)}
                    </div>
                </div>

            </div>



        </div>


    )
}










