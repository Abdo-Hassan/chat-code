import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA-e84zDXE_99cBNxjIW77Zy6V1ZhV5-Kw',
  authDomain: 'chat-code-ccbfd.firebaseapp.com',
  databaseURL: 'https://chat-code-ccbfd.firebaseio.com',
  projectId: 'chat-code-ccbfd',
  storageBucket: 'chat-code-ccbfd.appspot.com',
  messagingSenderId: '587526968494',
  appId: '1:587526968494:web:195478041c40085ebd093f',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();

export default firebase;
