import {initializeApp} from 'firebase/app'
const API_KEY = import.meta.env.VITE_API_DATABASE_KEY
const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN
const DATABASE_URL = import.meta.env.VITE_DATABASE_URL
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID
const STORAGE_BUCKET = import.meta.env.VITE_STORAGE_BUCKET
const MESSAGING_SENDER_ID = import.meta.env.VITE_MESSAGING_SENDER_ID
const APP_ID = import.meta.env.VITE_APP_ID

const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	databaseURL: DATABASE_URL,
	projectId: PROJECT_ID,
	storageBucket: STORAGE_BUCKET,
	messagingSenderId: MESSAGING_SENDER_ID,
	appId: APP_ID,
}

export const app = initializeApp(firebaseConfig)
