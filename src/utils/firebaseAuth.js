import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCFBh2_-rKZuyz7zxzg9uTvak7882V0IBM",
  authDomain: "swiggy-project-f9f0a.firebaseapp.com",
  projectId: "swiggy-project-f9f0a",
  storageBucket: "swiggy-project-f9f0a.appspot.com",
  messagingSenderId: "37689816290",
  appId: "1:37689816290:web:496bed280dc1e62ec89abb",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider}