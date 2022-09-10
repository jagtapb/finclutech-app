import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPRR2iZ5HopTTEDEZzZH7kWNU9LvZ07eQ",
  authDomain: "finclutech-assessment.firebaseapp.com",
  projectId: "finclutech-assessment",
  storageBucket: "finclutech-assessment.appspot.com",
  messagingSenderId: "131450870931",
  appId: "1:131450870931:web:ba96c474bc2964c6554166",
  measurementId: "G-Q7KV6GEZ2Z"
};


const config = initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore();


export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};


export const signOutUser = async () => await signOut(auth);
export const onUserAuthStateChanged = async (callback) => onAuthStateChanged(auth, callback);


// we can move all this below unction somewhere in new file.
// can do later.
//function to create/check user in Firebase
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const { email } = userAuth;
    const userRef = doc(firestore, 'Users', userAuth.uid);
    const snapshot = await getDoc(userRef);
  
    if (!snapshot.exists()) {
      try {
        await setDoc(userRef, {
          email,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };
  























  export const saveUserData = async (users) => {
    if (!localStorage.getItem('userToken')) return;
  
    const userRef = doc(firestore, 'Users', localStorage.getItem('userToken'));
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
      try {
        await setDoc(userRef, {users}, { merge: true });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };
  

  
  export const getUserData = async () => {
    if (!localStorage.getItem('userToken')) return;
  
    const userRef = doc(firestore, 'Users', localStorage.getItem('userToken'));
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
      try {
        return snapshot.data();
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return [];
  };
  

  export default config;