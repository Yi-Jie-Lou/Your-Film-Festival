import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { db } from "./utils/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./login";
import Backstage from "./backstage";
import Features from "./features";
import "./css/index.css";
const root = createRoot(document.getElementById("root"));

// getDocs(collection(db, "users")).then((res) => {
//   res.forEach((doc) => {
//     console.log(`${doc.id} => ${doc.data().festivalLogo}`);
//   });
// });

function Index() {
  return <div className="App">Hello</div>;
}

function Routers() {
  const [userUID, setUserUID] = useState("");

  useEffect(() => {
    const monitorAuthState = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUserUID(currentUser.uid);
        }
      });
    };
    monitorAuthState();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="login" element={<Login />} />
        <Route path="backstage" element={<Backstage userUID={userUID} />} />
        <Route path="backstage/features" element={<Features userUID={userUID} />} />
      </Routes>
    </BrowserRouter>
  );
}

root.render(
  <StrictMode>
    <Routers />
  </StrictMode>
);
