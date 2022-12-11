import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Weather from './Components/Weather';
// import Time from './Components/Time';
import { collection, where, query, getDocs } from 'firebase/firestore';

import Sign from './Components/SignIn';
import Register from './Components/Register';
import Reset from './Components/Reset';
import EventsHolder from './Components/EventsHolder';
import NavigationBar from './Components/NavigationBar';
import { auth, db } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Ics from './Components/Ics';
import Photo from './Components/Photo';

import RssLinkHolder from './Components/RssLinkHolder';

const Main = () => {
  // const startTimer = () => (hideElements = setInterval(hideMouse, 3000));
  const imgRef = useRef<HTMLImageElement>();
  let index = 1;
  const [user, setUser] = useState('');
  const [currUser, loading] = useAuthState(auth);

  async function getUser() {
    if (currUser == null) {
      return;
    }
    try {
      const q = query(
        collection(db, 'users'),
        where('uid', '==', currUser?.uid)
      );
      const userDoc = await getDocs(q);
      const userID = userDoc.docs[0].id;

      setUser(userID);
    } catch (err) {
      console.log(err);
      alert('An error had occurred while fetching the users name');
      return;
    }
  }

  async function loadData() {
    await getUser();
    if (user !== '') {
      fetch('http://127.0.0.1:5000/addCalendar', {
        method: 'POST',
        body: JSON.stringify({ user }),
        mode: 'no-cors',
      });
    }
  }

  const hideMouse = () => {
    const getMouseCoords = () => {
      let body = document.querySelector('body');
      if (body !== null) body.style.cursor = 'auto';

      let btn = document.querySelector('.sign-out-button');
      btn?.classList.add('move-down');
    };

    let onBtn = false;

    let body = document.querySelector('body');
    if (body !== null) body.style.cursor = 'none';

    let btn = document.querySelector('.sign-out-button');

    btn?.addEventListener('mouseover', () => {
      onBtn = true;
      // clearInterval(hideElements);
    });

    btn?.addEventListener('mouseout', () => {
      // startTimer();
    });

    if (body !== null) body.style.cursor = onBtn ? 'auto' : 'none';
    if (!onBtn) {
      btn?.classList.remove('move-down');
    } else {
      btn?.classList.add('move-down');
    }

    onBtn = false;

    document.onmousemove = getMouseCoords;
  };

  useEffect(() => {
    let images = JSON.parse(localStorage.getItem('pictures'));
    if (images !== undefined && images !== null) {
      imgRef.current?.setAttribute('src', images[0]);
    }
    loadData();
  }, [currUser, user]);

  const changeImage = () => {
    let images = JSON.parse(localStorage.getItem('pictures'));
    if (images === undefined || images === null) return;
    if (index === images.length) index = 0;
    if (index < images.length && imgRef !== undefined)
      imgRef.current?.setAttribute('src', images[index]);
    index++;
  };

  // let hideElements = setInterval(hideMouse, 3000);
  // changeImage();
  let chngImg = setInterval(changeImage, 1000 * 10);

  return (
    <div className="component-holder">
      <NavigationBar text={'disp'} />

      <img className="bg-image" src="" alt="" width={100} ref={imgRef} />

      <Weather />
      <EventsHolder />
      {/* <RssLinkHolder uid={user} /> */}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sign />} />;
        <Route path="/disp" element={<Main />} />;
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/ics" element={<Ics />} />
        <Route path="photo" element={<Photo />} />
      </Routes>
    </Router>
  );
}
