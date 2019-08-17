import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
const firebaseConfig = {
  apiKey: "AIzaSyBT79sShWNdH3M1aa2vxLiI3U2kjKUIslk",
  authDomain: "fairlottery.firebaseapp.com",
  databaseURL: "https://fairlottery.firebaseio.com",
  projectId: "fairlottery",
  storageBucket: "",
  messagingSenderId: "28244127556",
  appId: "1:28244127556:web:2ad245a28afcf9bb"
};

firebase.initializeApp(firebaseConfig);

export default firebase 