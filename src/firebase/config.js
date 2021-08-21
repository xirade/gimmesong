import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAvFiyB5Q9hGZXs-8SS5UpNINIzKk0cm60",
  authDomain: "gimmesong-70304.firebaseapp.com",
  projectId: "gimmesong-70304",
  storageBucket: "gimmesong-70304.appspot.com",
  messagingSenderId: "409234488684",
  appId: "1:409234488684:web:60d6a2cd810f64057ac749",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
