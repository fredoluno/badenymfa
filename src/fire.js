import firebase from 'firebase'
import 'firebase/firestore'
var config = {
    apiKey: "AIzaSyC1BOHnKyqjFTkipQ68TqcjTBMcfHJkZ4k",
    authDomain: "badenymfaprod.firebaseapp.com",
    databaseURL: "https://badenymfaprod.firebaseio.com",
    projectId: "badenymfaprod",
    storageBucket: "badenymfaprod.appspot.com",
    messagingSenderId: "30877578708"
  };
  var fire = firebase.initializeApp(config);
  export const firestore = firebase.firestore();
  export default fire;