import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "MESSAGING_SENDER_ID",
  appId: "APP_ID",
  measurementId: "MEASUREMENT_ID",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// signup function
export const handleSignUp = async (email, password) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log(firebase.auth().currentUser);
    const user = firebase.auth().currentUser;
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

export const handleSignIn = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);

    console.log(firebase.auth().currentUser);
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

export const handleSignout = async () => {
  await firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Signed Out");
    })
    .catch((error) => {
      throw new Error(error);
    });
};
