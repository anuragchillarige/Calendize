import { type } from 'os';
import React, { useEffect, useState } from 'react';

function RssLinkHolder(props) {
  // const [currUser, loading] = useAuthState(auth);
  const [rssData, setRssData] = useState([])
  const [user, setUser] = useState('');


  // async function getUser() {
  //   if (currUser == null) {
  //     return;
  //   }
  //   try {
  //     const q = query(
  //       collection(db, 'users'),
  //       where('uid', '==', currUser?.uid)
  //     );
  //     const userDoc = await getDocs(q);
  //     const userID = userDoc.docs[0].id;

  //     setUser(userID);
  //   } catch (err) {
  //     console.log(err);
  //     alert('An error had occurred while fetching the users name Bhavan');
  //     return;
  //   }
  // }

  async function loadData() {
    if (user !== '') {
      await fetch('http://127.0.0.1:5000/readRssLinks', {
        method: 'POST',
        body: JSON.stringify({ user }),
      })
        .then((res) => { res.json().then(data => setRssData(data)) })
        .catch((e) => { console.log(e) })
    }
  }

  useEffect(() => {
    setUser(props.uid)
    console.log(user)
    loadData();
  }, [user, props.uid]);

  useEffect(() => { console.log(rssData) }, [rssData])

  return (
    <div style={{ background: "red" }}>
      {rssData.map((val, index) => type(val))}
    </div >
  );
}


export default RssLinkHolder;
