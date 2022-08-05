import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
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
  const startTimer = () => (hideElements = setInterval(hideMouse, 3000));
  const [img, setImg] = useState('');
  let index = 0;
  let images: any[] = [];

  useEffect(() => {
    images = importAll(
      require.context('./Images', false, /\.(png|jpe?g|svg)$/)
    );
    images = images.splice(0, images.length / 2);
    setImg(images[0].substring(2));
    console.log(images);
  }, []);

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

  const changeImage = () => {
    console.log(index);
    if (index === images.length) {
      index = 0;
    }

    if (index < images.length) setImg(images[index].substring(2));
    index++;
  };

  let hideElements = setInterval(hideMouse, 3000);
  let chngImg = setInterval(changeImage, 1000 * 60);

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
