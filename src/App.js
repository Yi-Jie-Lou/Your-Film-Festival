import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogin, getPeriod } from "./actions";
import { firebase } from "./utils/firebase-config";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Backstage from "./pages/Backstage";
import Features from "./pages/Features";
import News from "./pages/News";
import Timetable from "./pages/Timetable";
import Price from "./pages/Price";
import Workshop from "./pages/Workshop";

function App() {
  const dispatch = useDispatch();
  const userID = useSelector(state => state.userID)
  const [userUID, setUserUID] = useState("");
  const [login, setLogin] = useState("");
  useEffect(() => {
    const monitorAuthState = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          dispatch(userLogin(currentUser.uid));

          firebase.readFestivalData(currentUser.uid).then((res) => {
            console.log("keep mind!");
            console.log(res)


            const timetableArray = res.features.map(item => {
              return item.timetable
            })
            const allTimetables = timetableArray.reduce(
              (previousValue, currentValue) =>  [...previousValue , ...currentValue],
              []
            );  
            dispatch(getPeriod(allTimetables));
  

            // const festivalData = {
            //   locations: res.locations,
            //   dates: res.festivalPeriod,
            // };
            // setFestivalData(festivalData);
            // setQureyDate(festivalData.dates[0].dates);
            // setTimetable(timetables)
          });
      




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

export default App;

/*user未登入*/
/* template 各頁面要求登入 */
/* preview 倒回login */
/* build 抓該影展資料 */

/*user登入*/
/* template 可進入後台 */
/* preview 抓該UID資料 */
/* build 抓該影展資料 */

/* 一個首頁有幾種狀態呢？
 現在只有一個state - UID
 props.state > template-抓特定資料 preivew-抓UID資料 build-抓特定資料
 決定要抓哪裡資料的，是props.state
1. 未登入的Tamplate
2. 已登入的Tamplate
3. User preview
4. User build
*/