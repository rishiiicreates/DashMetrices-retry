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
export const signInWithEmail = async (email: string, password: string) => {
  try {
    console.log("Attempting to sign in with email:", email);
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log("Email sign-in successful:", result.user.uid);
    return result;
  } catch (error) {
    console.error("Firebase email sign-in error:", error);
    throw error;
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    console.log("Attempting to sign up with email:", email);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Email sign-up successful:", result.user.uid);
    return result;
  } catch (error) {
    console.error("Firebase email sign-up error:", error);
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    console.log("Attempting to sign in with Google");
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google sign-in successful:", result.user.uid);
    return result;
  } catch (error) {
    console.error("Firebase Google sign-in error:", error);
    throw error;
  }
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
