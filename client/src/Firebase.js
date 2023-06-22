/* eslint-disable no-undef */

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAM5hTXl0XTWMwI-jlm-v0AGDg7oYp5cHI',
  authDomain: 'hackreactor-boc.firebaseapp.com',
  projectId: 'hackreactor-boc',
  storageBucket: 'hackreactor-boc.appspot.com',
  messagingSenderId: '930617036809',
  appId: '1:930617036809:web:329dc75cedd9ff51f9e8d8'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log('send update to user table to set isloggedin to true');
      console.log('results', result);
    })
    .catch((err) => {
      alert(err);
    });
};

export const signOutOfGoogle = () => {
  const email = auth.currentUser.email;
  if (auth.currentUser === null) {
    alert('You are already signed out, please sign in to checkout');
  } else {
    alert('You have signed out');
  }
  signOut(auth)
    .then(() => {
      console.log('send update to user table to set isloggedin to false');
    })
    .catch((err) => {
      alert(err);
    });
};
