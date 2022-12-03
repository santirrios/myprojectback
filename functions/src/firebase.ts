// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXz4lfrZhb9cMeTwV3_qnm_uUB-_-Xm0g",
  authDomain: "vue-firebase-fbc54.firebaseapp.com",
  projectId: "vue-firebase-fbc54",
  storageBucket: "vue-firebase-fbc54.appspot.com",
  messagingSenderId: "645062369086",
  appId: "1:645062369086:web:d29daaf0dc0d857b8f966f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);



