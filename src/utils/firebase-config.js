import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAXxoQUDtYZTpNVNCmeZCQ97Co5rFrN6ic",
  authDomain: "your-film-festival-d2cd4.firebaseapp.com",
  projectId: "your-film-festival-d2cd4",
  storageBucket: "your-film-festival-d2cd4.appspot.com",
  messagingSenderId: "949992507014",
  appId: "1:949992507014:web:7c9e03ee195d4929613307"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBrwJjShEP05ZDht3NOS8l42zorWAvVzKE",
//   authDomain: "world-time-c50d3.firebaseapp.com",
//   projectId: "world-time-c50d3",
//   storageBucket: "world-time-c50d3.appspot.com",
//   messagingSenderId: "1094487602172",
//   appId: "1:1094487602172:web:624503119335e8d211f879",
//   measurementId: "G-8XE0N0MZEW",
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// export default auth;