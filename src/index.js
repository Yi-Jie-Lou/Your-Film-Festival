import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Backstage from "./pages/Backstage";
import Features from "./pages/Features";
import Timetable from "./pages/Timetable";
import "./css/index.css";


const root = createRoot(document.getElementById("root"));

function Index() {
  return <div className="App">Hello</div>;
}

function Routers() {
  const [userUID, setUserUID] = useState("");
  const [login, setLogin] = useState("");
  useEffect(() => {
    const monitorAuthState = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUserUID(currentUser.uid);
          setLogin("login")
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
        <Route path="timetable" element={<Timetable userUID={userUID}/*這裡應該是影展名字*/ userState={login} />} />
        <Route path="preview/timetable" element={<Timetable userUID={userUID} userState={"preview"} />} />
      </Routes>
    </BrowserRouter>
  );
}

/*模板會有button，正式發佈沒有*/

root.render(
  // <StrictMode>
    <Routers />
  // </StrictMode>
);
