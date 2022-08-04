import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { auth, register } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../Styles/Register.css'
function Register() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confPass, setConfPass] = useState("");
    const [name, setName] = useState("");
    const [currUser, loading, err] = useAuthState(auth);
    const nav = useNavigate();
    useEffect(() => {
        if (loading) {
            return;
        }
        if (currUser) nav("/");
    }, [currUser, loading]);

    function confirmPass() {
        if (pass === confPass)
            register(name, email, pass)
        else {
            const passwordBox = document.querySelectorAll('.password.conf')
            for (let el of passwordBox) {
                el.style.border = '2px solid red'
            }

        }
    }

    return (
        <div className="holder">
            <div className="welcome-panel">
                <div className='welcome'>
                    <div className="title">
                        <b>Sign up</b>
                    </div>
                    <input
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        value={email}
                        placeholder="E-mail"
                        type="email"
                        className="email"
                        onChange={(e) => setEmail(e.target.value)} />
                    <input
                        value={pass}
                        onChange={(e) => { setPass(e.target.value); e.target.style.border = "none" }} placeholder="Password" type="password"
                        className="password" />
                    <input
                        value={confPass}
                        onChange={(e) => { setConfPass(e.target.value); e.target.style.border = "none" }} placeholder="Confirm Password" type="password"
                        className="password conf" />
                    <button
                        className='register'
                        onClick={confirmPass}>
                        Register</button>
                </div>
                <div className='have-account'>
                    <h1>Already have an account? <Link to="/" className='sign-in-button'>
                        <span>Sign in</span>
                    </Link>
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Register;