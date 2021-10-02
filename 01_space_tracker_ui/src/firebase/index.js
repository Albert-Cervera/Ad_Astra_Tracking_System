import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
}

// Initialize Firebase application
const app = firebase.initializeApp(config)
// Export Firebase auth instance
// export const auth = app.auth()
// Export Firestore database instance
export const db = app.firestore()
// Export Firebase Storage
// export const storage = app.storage()
