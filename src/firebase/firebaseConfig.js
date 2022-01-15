import { initializeApp } from 'firebase/app'
import {
	getFirestore,
	doc,
	collection,
	addDoc,
	setDoc,
	onSnapshot,
} from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'

const firebaseConfig = {
	apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_APP_FIREBASE_SENDER_ID,
	appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()
const provider = new GoogleAuthProvider()

export {
	app,
	auth,
	db,
	provider,
	onSnapshot,
	onAuthStateChanged,
	doc,
	collection,
	addDoc,
	setDoc,
}
