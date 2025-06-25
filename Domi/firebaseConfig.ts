import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB8VDvg0MnY6LpHWwzhgYZ7yLB2PW21YvA",
  authDomain: "duantotnghiep-10d5f.firebaseapp.com",
  databaseURL: "https://duantotnghiep-10d5f-default-rtdb.firebaseio.com",
  projectId: "duantotnghiep-10d5f",
  storageBucket: "duantotnghiep-10d5f.appspot.com",
  messagingSenderId: "168952302436",
  appId: "1:168952302436:web:763932a63f3875fabd4871",
  measurementId: "G-1QLE4VWW08"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);