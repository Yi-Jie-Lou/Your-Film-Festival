import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXxoQUDtYZTpNVNCmeZCQ97Co5rFrN6ic",
  authDomain: "your-film-festival-d2cd4.firebaseapp.com",
  projectId: "your-film-festival-d2cd4",
  storageBucket: "your-film-festival-d2cd4.appspot.com",
  messagingSenderId: "949992507014",
  appId: "1:949992507014:web:7c9e03ee195d4929613307"
  // apiKey: "AIzaSyDz4pHOLWAbEXPB5Xa2Ks-czqAMemfHOLI",
  // authDomain: "project2-draft.firebaseapp.com",
  // projectId: "project2-draft",
  // storageBucket: "project2-draft.appspot.com",
  // messagingSenderId: "98376440747",
  // appId: "1:98376440747:web:159654289e8cda601890ee",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const firebase = {
  readFestivalData(UID) {
    return getDoc(doc(db, "users", `${UID}`)).then((res) => {
      return res.data();
    });
  },

  updateFeaturesData(UID, data) {
   return updateDoc(doc(db, `users/${UID}/features`, `${UID}`), data).then(() => {
      alert("儲存成功!");
    });
  },

  initDataBase(UID) {
    return setDoc(doc(db, "users", `${UID}`), {
      festivalEnd: "",
      festivalLogo: "",
      festivalName: "",
      festivalPathName: "",
      festivalPost: "",
      festivalStart: "",
      locations: [],
      uid: UID,
    }).then((_) => {
      for (let i = 0; i < 5; i++) {
        const newFeatureRef = doc(collection(db, `users/${UID}/features`));
        setDoc(newFeatureRef, {
          featureID: newFeatureRef.id,
        });
      }
    });
  },
};

export { db, auth, firebase };
