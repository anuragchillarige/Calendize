import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Weather from './Components/Weather';
// import Time from './Components/Time';
import {
  collection,
  doc,
  where,
  query,
  onSnapshot,
  getDocs,
} from 'firebase/firestore';

import Sign from './Components/SignIn';
import Register from './Components/Register';
import Reset from './Components/Reset';
import EventsHolder from './Components/EventsHolder';
import NavigationBar from './Components/NavigationBar';
import { logout, auth, db } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { json } from 'stream/consumers';
import Ics from './Components/Ics'

const Main = () => {
  // const startTimer = () => (hideElements = setInterval(hideMouse, 3000));
  const [img, setImg] = useState('');
  let index = 0;
  let images: any[] = [];
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

  async function loadCalendar() {
    await getUser();
    if (user !== '') {
      fetch('http://127.0.0.1:5000/addCalendar', {
        method: 'POST',
        body: JSON.stringify({ user }),
        mode: 'no-cors',
      });
    }

    images = importAll(
      require.context('./Images', false, /\.(png|jpe?g|svg)$/)
    );
    images = images.splice(0, images.length / 2);
    setImg(images[0].substring(2));
  }

  function importAll(r: __WebpackModuleApi.RequireContext) {
    let images: any[] = [];
    r.keys().map((item: any) => {
      images.push(item);
    });

    return images;
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

  const changeImage = () => {
    if (index === images.length) {
      index = 0;
    }

    if (index < images.length) setImg(images[index].substring(2));
    index++;
  };

  useEffect(() => {
    loadCalendar();
  }, [currUser, user]);

  // let hideElements = setInterval(hideMouse, 3000);
  let chngImg = setInterval(changeImage, 1000 * 10);

  return (
    <div className="component-holder">
      <NavigationBar text={"disp"} />
      {img !== '' ? (
        <img
          className="bg-image"
          src={require(`./Images/${img}`)}
          alt=""
          width={100}
        />
      ) : (
        <></>
      )}
      {/* <button
        className="sign-out-button"
        onClick={() => {
          logout();
          location.reload();
        }}
      >
        Sign Out
      </button> */}
      <Weather />
      <EventsHolder />
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
      </Routes>
    </Router>
  );
}
