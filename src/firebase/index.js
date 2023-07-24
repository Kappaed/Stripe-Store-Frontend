import firebase from "firebase/compat/app";
import "firebase/compat/firestore"; // for the db
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmb8e-jFHMSZPeiE-nwKgLXzipj4fHdx8",
  authDomain: "stripe-store-281f3.firebaseapp.com",
  projectId: "stripe-store-281f3",
  storageBucket: "stripe-store-281f3.appspot.com",
  messagingSenderId: "192779350991",
  appId: "1:192779350991:web:a78b42541d119c1cc898ba",
  measurementId: "G-SLGTMQX4RC",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const auth = firebase.auth();

const createUserProfileDocument = async (userAuth, addData) => {
  if (!userAuth) {
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.multiFactor.user.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...addData,
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }

  return userRef;
};

export { auth, createUserProfileDocument, firestore };
