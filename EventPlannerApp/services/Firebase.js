import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8aRSLGPyxpofy9ovZhfuUkJPtFdoI_ZU",
  authDomain: "mis-event-planner.firebaseapp.com",
  projectId: "mis-event-planner",
  storageBucket: "mis-event-planner.appspot.com",
  messagingSenderId: "818250396732",
  appId: "1:818250396732:web:15e903eac0001a6bedff39",
  measurementId: "G-NTVV031MZE",
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
