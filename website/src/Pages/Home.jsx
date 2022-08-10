import logo from "../calendize-home.png"
import '../Styles/Home.css'
import { useNavigate } from 'react-router-dom';
import { logout } from "../firebase";
import TypeAnimation from 'react-type-animation';
import React from 'react';


export default function Home() {
    const nav = useNavigate();


    return (
        <div className="home">
            <nav className="home-nav">
                <img src={logo} alt="calendize logo" />
                <div style={{ "width": "70%" }}></div>
                <button className="sign-button sign-in" onClick={e => { e.preventDefault(); logout(); nav("/sign") }}>Log In</button>
                <button className="sign-button sign-up" onClick={e => { e.preventDefault(); logout(); nav("/register") }}>Sign Up</button>
            </nav>


            <p className="motto">Event management, <TypeAnimation cursor={true} sequence={['', 1000, 'done right.', 1000]} repeat={1} wrapper="span" className="special" /></p>
        </div>
    )
}