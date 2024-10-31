
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyAhP3Twf9JDBj4maqw33KKEncJTVztLp_U",
    authDomain: "netflix-clone-e6540.firebaseapp.com",
    projectId: "netflix-clone-e6540",
    storageBucket: "netflix-clone-e6540.appspot.com",
    messagingSenderId: "1005619800685",
    appId: "1:1005619800685:web:0bc5a4fa149a026e3bad64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize auth
const auth = getAuth(app)

// intialize database
const db = getFirestore(app)

// Register User
const signup = async(name, email, password) => {
     try {
       const res = await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;

       await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email
       })
     } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split('-').join(" "))
     }
}


// Login user
const login = async(email, password) => {
    try {
       await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split('-').join(" "))
    }
}

// logout user
const logout = () => {
    signOut(auth)
}

export {auth, db, signup, login, logout}