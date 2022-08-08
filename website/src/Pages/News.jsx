import React, { useState, useEffect, useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { setDoc, updateDoc, collection, where, query, getDocs, doc } from "firebase/firestore";
import '../Styles/News.css'

function News() {
    const [currUser, loading] = useAuthState(auth)
    const [link, setLink] = useState("")
    const [rssArr, setRssArr] = useState([]); // holds the rss links
    const [arrChange, setArrChange] = useState(false)
    const [user, setUser] = useState()
    const linkInput = useRef()


    useEffect(() => {
        async function loadRssArr() {
            if (!currUser)
                return;
            try {
                const q = query(
                    collection(db, 'users'),
                    where('uid', '==', currUser?.uid)
                );
                const userDoc = await getDocs(q);
                const data = userDoc.docs[0].data();
                const userID = userDoc.docs[0].id;
                setUser(userID)
                let temp = data.rssLink;
                setRssArr(temp);
                console.log(temp)
            }
            catch (err) {
                alert("Unable to load user's doc");
            }
        }

        loadRssArr();
    }, [currUser, arrChange])


    async function submitData(e) {
        if (link.trim() != "") {
            console.log("called")
            try {
                const q = query(
                    collection(db, 'users'),
                    where('uid', '==', currUser?.uid)
                );
                const userDoc = await getDocs(q);
                let arr = [...rssArr]
                if (arr.length <= 4) {
                    arr.push(link)
                    setRssArr(arr)
                    setArrChange(!arrChange)
                    await updateDoc(doc(db, "users", userDoc.docs[0].id), {
                        rssLink: arr
                    });
                    linkInput.current.value = ''
                }
                else {
                    alert("Only 5 Rss Links allowed")
                    linkInput.current.value = ''
                }

            }
            catch (err) {
                alert("Unable to add RSS link to database");
            }
        }

    }

    async function deleteEvent(index) {
        let newArr = [...rssArr]

        newArr.splice(index, 1)
        await updateDoc(doc(db, 'users', user), { rssLink: newArr })
        setArrChange(!arrChange)
    }

    return (
        <>
            <div className="rssPage-holder">
                <div className="link-submit-holder">
                    <form onSubmit={e => { e.preventDefault(); submitData(e) }}>
                        <h1 className="rssLinkTitle">
                            Add RSS Link
                        </h1>
                        <input className="input-rss" type="url" placeholder='RSS Link' value={link} ref={linkInput} onChange={(e) => setLink(e.target.value)}>
                        </input>
                        <button className="rss-submit" type="submit"><a>Add</a></button>
                    </form>

                </div >


                <div className="outside">
                    <div className="rss-link-header">
                        <h1>
                            RSS Header
                        </h1>
                    </div>
                    <div className="rss-housing">
                        {rssArr.map((link, index) =>
                            <div className="link-holder" key={index}>
                                <h3>{link}</h3>
                                <button onClick={() => deleteEvent(index)}>click</button>
                            </div>)}
                    </div>
                </div>
            </div>
        </>

    );
}
export default News;
