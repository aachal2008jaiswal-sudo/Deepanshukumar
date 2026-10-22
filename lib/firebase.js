import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Yahan baad me aapka asli config ayega, abhi ke liye ye chalega
const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForNow123",
  authDomain: "deepanshu-attendance.firebaseapp.com",
  projectId: "deepanshu-attendance",
  storageBucket: "deepanshu-attendance.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
