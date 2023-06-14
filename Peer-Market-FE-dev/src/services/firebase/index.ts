import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBEAgv_1EGUJmh4g0l_N_MLL760s8to6J4",
  authDomain: "e-commerce-a9d1d.firebaseapp.com",
  projectId: "e-commerce-a9d1d",
  storageBucket: "e-commerce-a9d1d.appspot.com",
  messagingSenderId: "822479423809",
  appId: "1:822479423809:web:5b2440d1398435f291b9c0",
  measurementId: "G-RSN99855JR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
