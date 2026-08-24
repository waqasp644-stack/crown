import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPPjgGwUVV0KXQm3ifFPp_5sSD4oEdARI",
  authDomain: "crown-c871c.firebaseapp.com",
  projectId: "crown-c871c",
  storageBucket: "crown-c871c.firebasestorage.app",
  messagingSenderId: "200371102593",
  appId: "1:200371102593:web:9db73ddc49efcaa936fe80",
  measurementId: "G-C8F51RWG4D"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// LOCALHOST TESTING FIX (Billing and Recaptcha Bypass)
if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  auth.settings.appVerificationDisabledForTesting = true;
}

export default app;