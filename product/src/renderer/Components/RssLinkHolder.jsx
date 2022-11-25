
import React, { useEffect, useState, useRef } from 'react';

function RssLinkHolder(props) {
  // const [currUser, loading] = useAuthState(auth);
  const [rssData, setRssData] = useState([[]])
  const [user, setUser] = useState('');
  const newsRef = useRef();
  let newsData = [[]]
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [date, setDate] = useState("");
  const [source, setSource] = useState("");
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
        .then((res) => { res.json().then(data => setRssData(data)).catch((e) => { console.log(e) }) })
        .catch((e) => { console.log(e) })
    }
  }

  useEffect(() => {
    setUser(props.uid)
    console.log(user)
    loadData();
  }, [user, props.uid]);

  useEffect(() => {
    newsData = rssData;
    console.log(newsData)
    if (newsData !== null)
      changeNews()
  }, [rssData])

  const newsIndex = () => {
    let newsSrc = parseInt(Math.random() * rssData.length);


    let index = 0;
    if (rssData[newsSrc] !== null)
      index = parseInt(Math.random() * (rssData[newsSrc].length - 1)) + 1;
    console.log(newsSrc)
    return [newsSrc, index];
  }


  const changeNews = () => {
    let indexes = newsIndex()

    if (newsData[indexes[0]] === undefined || newsData[indexes[0]][indexes[1]] === undefined)
      return
    let date1, title, summary, source = ""
    try {
      title = newsData[indexes[0]][indexes[1]][0]
    }
    catch (e) {
      console.log(e + " title " + indexes[0] + " " + indexes[1]);

    }
    try {
      summary = newsData[indexes[0]][indexes[1]][1]
    }
    catch (e) {
      console.log(e + " summary  " + indexes[0] + " " + indexes[1]);
    }
    try {
      date1 = newsData[indexes[0]][indexes[1]][2]
      console.log(date1)
    }
    catch (e) {
      console.log(e + " date1 " + indexes[0] + " " + indexes[1]);
    }
    try {
      source = newsData[indexes[0]][0]
    }
    catch (e) {
      console.log(e + " header " + indexes[0] + " " + indexes[1]);
    }

    if (title !== undefined && summary !== undefined && date1 !== undefined) {
      let innerData = title + " | " + summary + "|  " + date1 + " | " + source;
      setTitle(title);
      setSummary(summary);
      setDate(date1);
      setSource(source);
    }
  };

  if (newsData !== null)
    setInterval(changeNews, 1000 * 15);

  return (
    <div className='rss-holder' ref={newsRef}>
      <h1 className="rssH1">{title}</h1>
      <h3 className="rssH2">{summary}</h3>
      <div>
        <h4 className="rssH3">{date}</h4>
        <h4 className="rssH3">{source}</h4>
      </div>
    </ div>
  );
}


export default RssLinkHolder;
