import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth } from "firebase/auth";
import 'firebase/compat/database';
import 'firebase/compat/storage';
import Cookies from 'js-cookie';

const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_API_KEY,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
}

const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
const auth = firebase.auth(firebaseApp);
const storage = firebase.storage(firebaseApp);
const storageRef = storage.ref();

/**
 * Firebase Get Media List
 * @returns 
 */

export const fetchMediaList = async () => {
  const fileList = await storageRef.child('images/').listAll();
  const items = fileList.items;
  const results = await Promise.all(items.map(async (item) => {
    const url = await item.getDownloadURL();
    const result: ImageType = {
      name: item.name,
      url: url
    }
    return result;
  }));
  return results;
}

/**
 * Firebase Get Single Media
 * @param fileName 
 * @returns 
 */

export const downloadMedia = async (fileName: string): Promise<string> => {
  const fileRef = storageRef.child('images/' + fileName);
  const fileURL = await fileRef.getDownloadURL();
  return fileURL;
}

/**
 * Firebase Upload Media
 * @param file 
 * @returns 
 */

export const uploadMedia = async (file: File): Promise<ImageType> => {
  const metadata = {
    contentType: 'image/*'
  };
  const fileRef = storageRef.child('images/' + file.name);
  const uploadTask = await fileRef.put(file, metadata);
  const downloadURL = await uploadTask.ref.getDownloadURL();
  const result: ImageType = {
    name: file.name,
    url: downloadURL
  }
  return result;
}

/**
 * Firebase User Login
 * @param email 
 * @param password 
 */
export const userLogin = async (email: string, password: string): Promise<string | null> => {
  const userLogin = await auth.signInWithEmailAndPassword(email, password);
  const userData = userLogin.user;
  return userData? userData.uid : null;
}

/**
 * Firebase Get User ID
 * @returns 
 */
export const getUserId = async (): Promise<string> => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user === null) return "";
  return user.uid;
}

/**
 * Firebase User Signup
 * @param email 
 * @param password 
 */
export const userSignUp = async (email: string, password: string): Promise<string | null> => {
  const userLogin = await auth.createUserWithEmailAndPassword(email, password);
  const userData = userLogin.user;
  return userData? userData.uid : null;
}

/**
 * Firebase User Logout
 */

export const removeUserLogin = async (): Promise<void> => {
  const initFirebaseAuth = () => {
    return new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        resolve(user);
        unsubscribe();
      });
    });
  };
  const user = await initFirebaseAuth();
  if (user) {
    console.log(user);
  }
  auth.signOut().then(() => {
    Cookies.remove("user");
    console.log('Logout successed');
  })
    .catch((error) => {
      console.log(`Logout error (${error})`);
    });
}