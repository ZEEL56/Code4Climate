import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration - Replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyBvOkBwq7c8k9m2n3o4p5q6r7s8t9u0v1w",
  authDomain: "code4climate-demo.firebaseapp.com",
  projectId: "code4climate-demo",
  storageBucket: "code4climate-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789012345678"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;

