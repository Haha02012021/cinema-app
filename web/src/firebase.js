// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8dH7UxOnYFdId2sVxqgmTAQKeBC0PVu0",
  authDomain: "cinema-app-bfc00.firebaseapp.com",
  projectId: "cinema-app-bfc00",
  storageBucket: "cinema-app-bfc00.appspot.com",
  messagingSenderId: "20647718623",
  appId: "1:20647718623:web:4336cbe5e87b6551c0c36a",
  measurementId: "G-TFVG15LPTH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
