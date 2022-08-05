import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, updateDoc, collection, where, query, getDocs } from "firebase/firestore";

function News() {
    const [currUser] = useAuthState(auth)
    const [link, setLink] = useState("")
    const [rrsArr, setRssArr] = useState([])

    useEffect(() => {
        //length
    }, [rssArr])
    function submitData(e) {

        try {
            const q = query(
                collection(db, 'users'),
                where('uid', '==', currUser?.uid)
            );
            const userDoc = await getDocs(q);
            setRssArr(userDoc.docs[0].rssLinkNews);
        }
        catch (err) {
            alert("Could not load user's docs")
        }
    }

    return (
        <div>
            <form onSubmit={e => { e.preventDefault(); submitData(e) }}>
                <input type="url" placeholder='RSS Link' value={link} onChange={(e) => setLink(e.target.value)}>
                </input>
                <button type="submit">Add</button>
            </form>
        </div >
    );
}

export default News;