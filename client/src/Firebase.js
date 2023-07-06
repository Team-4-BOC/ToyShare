/* eslint-disable no-undef */

import { initializeApp } from 'firebase/app';
import swal from 'sweetalert';
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

const signInWithGoogle = (set) => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      return axios.get('/userNew', { params: { email: result.user.email } })
        .then((response) => {
          if (response.data.length !== 0) {
            swal({
              title: 'Success!',
              text: 'You are signed in!',
              icon: 'success',
              button: 'OK'
            });
            return response.data[0].id;
          } else {
            const name = result.user.displayName.split(' ');

            const data = {};
            data.first_name = name[0];
            data.last_name = name[1];
            data.email = result.user.email;

            return axios.post('/user', data)
              .then(() => {
                return axios.get('/userNew', { params: { email: result.user.email } })
                  .then((data) => {
                    const photoData = {};
                    photoData.user_id = data.data[0].id;
                    const id = data.data[0].id;
                    photoData.url = result.user.photoURL;
                    swal({
                      title: 'Welcome!',
                      text: 'You are signed in! Please update Your city/state information in your profile to see toy locations',
                      icon: 'success',
                      button: 'OK'
                    });
                    return axios.post('/user/photos', photoData)
                      .then((data) => {
                        return id;
                      });
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      alert(err);
    });
};

const signOutOfGoogle = () => {
  if (auth.currentUser === null) {
    alert('You are already signed out, please signin to checkout or edit your profile');
  } else {
    return signOut(auth)
      .then(() => {
        swal({
          title: 'Good bye!',
          text: 'You are signed out!',
          icon: 'success',
          button: 'OK'
        });
        return ('signed out');
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
  const idToken = auth.currentUser;
  if (idToken) {
    return idToken.email;
  } else {
    console.log('no user signed in');
  };
};

export { auth, signInWithGoogle, signOutOfGoogle, verifySignedIn, getCurrentUserInfo };
