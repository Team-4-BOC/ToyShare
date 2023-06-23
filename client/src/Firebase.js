/* eslint-disable no-undef */

import { initializeApp } from 'firebase/app';
import axios from 'axios';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';

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

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // alert('you are sighned in');
      axios.get('/userNew', { params: { email: result.user.email } })
        .then((response) => {
          console.log('RESPONSE', response);
          if (response.data.length !== 0) {
            alert('You are now Logged in');
          } else {
            const name = result.user.displayName.split(' ');
            console.log('name inside else block of get request then block', name);

            const data = {};
            data.first_name = name[0];
            data.last_name = name[1];
            data.email = result.user.email;

            axios.post('/user', data)
              .then(() => {
                console.log('inside post request for signInWithGoogle then block');
                // axios.post('/user/photos', { url: result.user.photoURL })
                //   .then(() => {
                //     alert('Thanks for logging in!!');
                //   });
              });
          }
        });
      // console.log('results', result);
    })
    .catch((err) => {
      alert(err);
    });
};

const signOutOfGoogle = () => {
  if (auth.currentUser === null) {
    alert('You are already signed out, please sign in to checkout or edit your profile');
  } else {
    signOut(auth)
      .then(() => {
        alert('You have signed out');
      })
      .catch((err) => {
        alert(err);
      });
  }
};

const verifySignedIn = () => {
  const idToken = auth.currentUser;
  if (idToken) {
    return true;
  } else {
    return false;
  }
};

const getCurrentUserInfo = () => {
  return auth.currentUser;
};

export { auth, signInWithGoogle, signOutOfGoogle, verifySignedIn, getCurrentUserInfo };
