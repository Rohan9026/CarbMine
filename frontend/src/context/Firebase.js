import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { createContext, useContext } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail
} from 'firebase/auth'
import { getFirestore, doc, setDoc } from "firebase/firestore";


const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APPID,

};


const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
export const firestore = getFirestore(firebaseApp);

export const useFirebase = () => {
    const firebase = useContext(FirebaseContext);
    if (!firebase) {
        throw new Error("useFirebase must be used within a FirebaseProvider");
    }
    return firebase;
}

export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, user => {
            if (user)
                setUser(user);
            else
                setUser(null);
        })
    }, [])

    const isLoggedIn = user ? true : false;


    const addUser = async (CoalName, email, password) => {
        try {
            // Create a new user with email and password
            const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            const loggedInUser = userCredential.user;

            // Create a user document in Firestore
            const user = {
                CoalName,
                email,
                userId: loggedInUser.uid,
            };
            const userDocRef = doc(firestore, 'users', loggedInUser.uid);

            await setDoc(userDocRef, user);
            console.log('User document created with UID: ', loggedInUser.uid);

            // Update the state with the new user
            onAuthStateChanged(firebaseAuth, (user) => {
                if (user) {
                    console.log('User is logged in:', user);

                } else {
                    console.log('No user is logged in');

                }
            });

        } catch (error) {
            console.error('Error creating user or setting authentication:', error);
        }
    };


    const signinUserWithEmailAndPassword = async (email, password) => {
        try {
            // Sign in with email and password
            const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
            // Return userCredential or a success message
            return userCredential;
        } catch (error) {
            // Handle and throw specific Firebase authentication errors
            let errorMessage = 'An error occurred during sign-in.';

            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address.';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'No account found with this email.';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password. Please try again.';
                    break;
                default:
                    errorMessage = 'Failed to sign in. Please check your credentials and try again.';
                    break;
            }

            // Throw an error with a specific message
            throw new Error(errorMessage);
        }
    };

    const signinWithGoogle = () => {
        signInWithPopup(firebaseAuth, googleProvider);
    }

    const sendPReset = (email) => {
        sendPasswordResetEmail(firebaseAuth, email);
    }

    const handleLogout = async () => {
        try {
            await signOut(firebaseAuth);
        } catch (error) {
            console.error('Error occurred during logout:', error);
        }
    };

    return (
        <FirebaseContext.Provider value={{
            user,
            isLoggedIn,
            addUser,
            signinUserWithEmailAndPassword,
            signinWithGoogle,
            handleLogout,
            sendPReset
        }
        }>
            {props.children}
        </FirebaseContext.Provider>
    )
}