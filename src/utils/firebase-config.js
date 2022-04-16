import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
  collectionGroup,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXxoQUDtYZTpNVNCmeZCQ97Co5rFrN6ic",
  authDomain: "your-film-festival-d2cd4.firebaseapp.com",
  projectId: "your-film-festival-d2cd4",
  storageBucket: "your-film-festival-d2cd4.appspot.com",
  messagingSenderId: "949992507014",
  appId: "1:949992507014:web:7c9e03ee195d4929613307",
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

  readTimetables(UID, featureID) {
    return getDocs(
      collection(db, `users/${UID}/features/${featureID}/timetable`)
    ).then((res) => {
      const datas = res.docs.map((doc) => {
        return { ...doc.data() };
      });
      return datas;
    });
  },

  readFeaturesData(UID) {
    return getDoc(
      doc(db, `users/${UID}/features`, "D1un6IeOE3k2cv3Vglo3")
    ).then((res) => {
      return res.data();
    });
  },

  getNewTimetableID(UID) {
    const timetableRef = doc(
      collection(db, `users/${UID}/features/D1un6IeOE3k2cv3Vglo3/timetable`)
    );
    return setDoc(
      doc(
        db,
        `users/${UID}/features/D1un6IeOE3k2cv3Vglo3/timetable`,
        timetableRef.id
      ),
      {
        date: "",
        start: "10:00",
        end: "12:00",
        location: "",
        opening: false,
        closing: false,
        timetableID: timetableRef.id,
      }
    ).then((_) => {
      return timetableRef.id;
    });
  },

  updateTimetable(UID, datas, timetableID) {
    return updateDoc(
      doc(
        db,
        `users/${UID}/features/D1un6IeOE3k2cv3Vglo3/timetable`,
        `${timetableID}`
      ),
      {
        date: datas.date,
        end: datas.end,
        location: datas.location,
        name: datas.name,
        start: datas.start,
        workshop: datas.workshop,
        opening: datas.opening,
        closing: datas.closing,
      }
    ).then(() => {
      console.log(UID, datas, timetableID);
      alert("儲存成功!");
    });
  },

  saveFeatures(UID, data) {
    
    return updateDoc(doc(db, `users`, `${UID}`), {
      features: data,
    }).then(() => {
      alert("儲存成功!");
    });
  },

  queryFeatures(qurey) {
    const q = query(
      collectionGroup(db, `timetable`),
      where("date", "==", qurey)
    );
    return getDocs(q).then((res) => {
      const datas = res.docs.map((doc) => {
        return { ...doc.data() };
      });
      return datas;
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

  buildFestival(UID) {
    return getDoc(doc(db, "users", UID)).then((res) => {
      console.log(res.data());
    });
  },
};

export { db, auth, firebase };
