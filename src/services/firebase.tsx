import * as firebase from 'firebase/app'
import React, { createContext, useContext } from 'react'

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.FIRE_API_KEY,
  authDomain: process.env.FIRE_AUTH_DOMAIN,
  databaseURL: process.env.FIRE_DB_URL,
  projectId: process.env.FIRE_PROJECT_ID,
  storageBucket: process.env.FIRE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIRE_MESSAGING_SENDER_ID,
  appId: process.env.FIRE_APP_ID,
}

export const fire = firebase.initializeApp(firebaseConfig)

const firebaseContext = createContext<firebase.app.App>(fire)
const { Provider } = firebaseContext

export const useFirebase = () => useContext(firebaseContext)

export const FirebaseProvider = ({ children}: { children: React.ReactNode }) => (
  <Provider value={fire}>
    {children}
  </Provider>
)