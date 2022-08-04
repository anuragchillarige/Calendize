import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, updateDoc, collection, where, query, getDocs } from "firebase/firestore";

function News() {
    const [currUser] = useAuthState(auth)
    const [link, setLink] = useState("")
    console.log(link)

    function submitData(e) {
        // const linkObject = {
        //     link: link
        // }
        // try {
        //     const q = query(
        //         collection(db, 'users'),
        //         where('uid', '==', currUser?.uid)
        //     );
        //     const userDoc = await getDocs(q);
        //     const docID = userDoc.docs[0].id;

        // }
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