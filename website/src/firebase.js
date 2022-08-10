import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from "firebase/auth";

import {
	getFirestore,
	setDoc,
	doc,
	addDoc,
	collection,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCGw5MLbVdPEN_ie5FHPnkuDkrxZf25-Fk",
	authDomain: "calendize-956a9.firebaseapp.com",
	projectId: "calendize-956a9",
	storageBucket: "calendize-956a9.appspot.com",
	messagingSenderId: "994073634703",
	appId: "1:994073634703:web:36715d7dabd3dbb50b0dfa",
	measurementId: "G-0VS982MSYM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const login = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (err) {
		console.error(err);
		alert("Invalid Email or Password");
	}
};

const register = async (name, email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const user = res.user;
		await addDoc(collection(db, "users"), {
			uid: user.uid,
			name,
			authProvider: "local",
			email,
			location: "None",
			iCalLinks: [],
			rssLinks: []
		});
	} catch (err) {
		console.log(err);
		alert("There was an error creating your account");
	}
};

const forgotPassword = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
		alert("Password reset link sent! Check spam if you don't see it");
	} catch (err) {
		alert("Invalid Email");
	}
};

const logout = () => {
	signOut(auth);
};

export { auth, db, login, register, forgotPassword, logout };
