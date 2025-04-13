import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged,
  updateProfile,
  type User 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfEYU1Wmv10XOsGF0zGDAIK8omnt4bLb0",
  authDomain: "dashmetrics-31044.firebaseapp.com",
  projectId: "dashmetrics-31044",
  storageBucket: "dashmetrics-31044.appspot.com",
  appId: "1:918725296076:web:f90150240f392d4447e769",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Authentication functions
export const signInWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUpWithEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const logOut = () => {
  return signOut(auth);
};

export const updateUserProfile = (user: User, data: { displayName?: string, photoURL?: string }) => {
  return updateProfile(user, data);
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export { auth, db };
