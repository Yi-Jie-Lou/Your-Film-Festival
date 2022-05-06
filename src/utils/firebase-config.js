import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import uniqid from "uniqid";

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
const storage = getStorage(app);

const firebase = {
  getAllPubished() {
    return getDocs(collection(db, `build`)).then((res) => {
      const datas = res.docs.map((doc) => {
        return doc.id;
      });
      return datas;
    });
  },

  readFestivalData(UID) {
    return getDoc(doc(db, "users", `${UID}`)).then((res) => {
      return res.data();
    });
  },


  saveFeatures(UID, data) {
    return updateDoc(doc(db, `users`, `${UID}`), {
      features: data,
    }).then(() => {
      alert("儲存成功!");
    });
  },

  saveNews(UID, data) {
    return updateDoc(doc(db, `users`, `${UID}`), {
      news: data,
    }).then(() => {
      alert("儲存成功!");
    });
  },

  saveWorkshop(UID, data) {
    return updateDoc(doc(db, `users`, `${UID}`), {
      workshop: data,
    }).then(() => {
      alert("儲存成功!");
    });
  },

  saveSponsor(UID, sponsor, primaryColor, secondaryColor) {
    return updateDoc(doc(db, `users`, `${UID}`), {
      sponsor,
      primaryColor,
      secondaryColor,
    }).then(() => {
      alert("儲存成功!");
    });
  },

  savePricePage(UID, price, traffic) {
    return updateDoc(doc(db, `users`, `${UID}`), {
      price,
      traffic,
    }).then(() => {
      alert("儲存成功!");
    });
  },

  uploadImgs(file) {
    if (!file) return;
    return uploadBytes(ref(storage, `${file.name}`), file);
  },

  uploadCropImgs(file) {
    if (!file) return;
    return uploadBytes(ref(storage, `crop/${file.name}`), file);
  },

  getUploadImgs(file) {
    if (!file) return;
    return getDownloadURL(ref(storage, `${file.name}`)).then((res) => {
      return res;
    });
  },

  getUploadCropImgs(file) {
    if (!file) return;
    return getDownloadURL(ref(storage, `crop/${file.name}`)).then((res) => {
      return res;
    });
  },

  initDataBase(UID) {
    const newID = uniqid()
    return setDoc(doc(db, "users", `${UID}`), {
      festivalEnd: "",
      festivalLogo: "",
      festivalName: "",
      festivalPathName: "",
      festivalPost: "",
      festivalStart: "",
      festivalPeriod: [{ dates: "", displayDates: "" }],
      locations: [],
      state:"login",
      features: [
        {
          featureID: newID,
          color: "",
          commercialInfo: "",
          format: "",
          important: false,
          language: "",
          length: "",
          longInfo: "",
          shortInfo: "",
          nation: "",
          note: "",
          title: "",
          trailer: "",
          year: "",
          timetable: [
            {
              date: "default",
              start: "10:00",
              end: "12:00",
              location: "default",
              opening: false,
              closing: false,
              name: "",
              timetableID: "",
              workshop: false,
              featureID: newID,
            },
          ],
          featureImgs: ["", "", ""],
          creators: [
            {
              img: "",
              info: "",
              name: "",
            },
          ],
        },
      ],
      uid: UID,
      news: [
        {
          content: "",
          isReadOnly: false,
          title: "",
          img: "",
          newsID: uniqid(),
          important: false,
        },
      ],
      price:  [{
        category: "",
        marketing: "",
        saleTime: "",
        tickets: [{ kind: "", price: "" }],
      }],
      traffic: [{
        text: "",
        img: "",
      }],
      workshop:[{
        title: "",
        img: "",
        text: "",
        guest: [""],
        workshopID: uniqid(),
        isReadOnly:false
      }],
      sponsor:{
        img:[""],
        text:[""]
      },
      primaryColor:"",
      secondaryColor:"",
      isGuide:true,
    });
  },

  buildFestival(UID, path) {
    return getDoc(doc(db, "users", UID)).then((res) => {
      setDoc(doc(db, "build", `${path}`), res.data()).then((_) => {
        alert("儲存成功!");
        window.location.href = `https://your-film-festival-d2cd4.web.app/festival=${path}`;
      });
    });
  },
};

export { db, auth, firebase, storage };
