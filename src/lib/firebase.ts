import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBdS3XZqhBJ6Z0n5fH-sRQfNXsXuK_8pQk",
  authDomain: "yavor-oils.firebaseapp.com",
  projectId: "yavor-oils",
  storageBucket: "yavor-oils.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
