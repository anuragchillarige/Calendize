import {
  MemoryRouter as Router,
  Routes,
  Route,
  useSearchParams,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';

import Weather from './Components/Weather';
// import Time from './Components/Time';

import Sign from './Components/SignIn';
import Register from './Components/Register';
import Reset from './Components/Reset';
import EventsHolder from './Components/EventsHolder';
import { logout } from './firebase';

const Main = () => {
  const startTimer = () => (hideElements = setInterval(func, 3000));
  const [img, setImg] = useState('');

  function importAll(r) {
    let images: any[] = [];
    r.keys().map((item, index) => {
      images.push(item);
    });

    return images;
  }

  useEffect(() => {
    const images = importAll(
      require.context('./Images', false, /\.(png|jpe?g|svg)$/)
    );
    setImg(images[0].substring(2));
    console.log(img);
  }, []);
  const func = () => {
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
      console.log('dfd');
      clearInterval(hideElements);
    });

    btn?.addEventListener('mouseout', () => {
      startTimer();
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

  let hideElements = setInterval(func, 3000);

  return (
    <div className="component-holder">
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

      <button
        className="sign-out-button"
        onClick={() => {
          logout();
          location.reload();
        }}
      >
        Sign Out
      </button>
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
        <Route path="/dash" element={<Main />} />;
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </Router>
  );
}
