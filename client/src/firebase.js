import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyB8TKZm9dek7cxM7f8s2GrMAAbn03BWNAk',
  authDomain: 'gqlsocialapp.firebaseapp.com',
  projectId: 'gqlsocialapp',
  storageBucket: 'gqlsocialapp.appspot.com',
  messagingSenderId: '540209891173',
  appId: '1:540209891173:web:e4d5d848e57465aa83438c',
  measurementId: 'G-PJWJ6G8VDY',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const githubAuthProvider = new firebase.auth.GithubAuthProvider();
