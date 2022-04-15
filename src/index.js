import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Backstage from "./pages/Backstage";
import Features from "./pages/Features";
import News from "./pages/News";
import Timetable from "./pages/Timetable";
import Price from "./pages/Price";
import Workshop from "./pages/Workshop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./css/index.css";

const root = createRoot(document.getElementById("root"));

function IndexContainer() {
  return (
    <div className="mt-24 ">
      <div className="h-64 border-2"></div>
      <div className="flex flex-wrap justify-around">
        <div className="my-6 w-2/5 h-64 border-2"></div>
        <div className="my-6 w-2/5 h-64 border-2"></div>
        <div className="my-6 w-1/4 h-60 border-2"></div>
        <div className="my-6 w-1/4 h-60 border-2"></div>
        <div className="my-6 w-1/4 h-60 border-2"></div>
      </div>
    </div>
  );
}

function Index(props) {
  return (
    <>
      <Header userUID={props.userUID} userState={props.userState} />
      <IndexContainer />
      <Footer />
    </>
  );
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
          setLogin("login");
        }
      });
    };
    monitorAuthState();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        {/*Template 是有按鈕帶有userState的 */}
        <Route
          path="/"
          element={<Index userUID={userUID} userState={login} />}
        />

        <Route
          path="news"
          element={<News userUID={userUID} userState={login} />}
        />
        <Route
          path="price"
          element={<Price userUID={userUID} userState={login} />}
        />
        <Route
          path="timetable"
          element={
            <Timetable
              userUID={userUID}
              /*這裡應該是影展名字*/ userState={login}
            />
          }
        />
        <Route
          path="workshop"
          element={<Workshop userUID={userUID} userState={login} />}
        />
        {/*backstage */}
        <Route path="backstage" element={<Backstage userUID={userUID} />} />
        <Route
          path="backstage/features"
          element={<Features userUID={userUID} />}
        />



        {/*Preview */}
        <Route
          path="preview/timetable"
          element={<Timetable userUID={userUID} userState={"preview"} />}
        />
      </Routes>
      {/*Build*/}
    </BrowserRouter>
  );
}

/*模板會有button，正式發佈沒有*/

root.render(
  // <StrictMode>
  <Routers />
  // </StrictMode>
);
