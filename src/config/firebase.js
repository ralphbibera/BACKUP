import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyC67Cq_EO1Hf22msgcOICOKkyN-hXZRQK8",
  authDomain: "streetstoschools-72348.firebaseapp.com",
  projectId: "streetstoschools-72348",
  storageBucket: "streetstoschools-72348.appspot.com",
  messagingSenderId: "547057047378",
  appId: "1:547057047378:web:6c49ec5a55b749c2204c8b",
};

const fire = firebase.initializeApp(firebaseConfig);

export const auth = fire.auth();
export const firestore = fire.firestore();
export const storage = fire.storage();

