/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL4FHJN_olcz-JnW0CprGQgZZbIPX5BRw",
  authDomain: "fir-course-2023a.firebaseapp.com",
  projectId: "fir-course-2023a",
  storageBucket: "fir-course-2023a.appspot.com",
  messagingSenderId: "912001322617",
  appId: "1:912001322617:web:139827a38cedeef3370ea8",
  measurementId: "G-YX1XFC6451",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
