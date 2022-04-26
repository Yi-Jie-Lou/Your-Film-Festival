import { useEffect, useState, ReactFragment } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  userLogin,
  updatePeriod,
  updateLocations,
  updateFeatures,
  switchTab,
  updateFestivalName,
  updateFestivalPathName,
  updateFestivalLogo,
  updateFestivalPost,
  updateNews,
  updatePrice,
  updateTraffic,
  updateWorkshop,
} from "./actions";
import { firebase } from "./utils/firebase-config";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Backstage from "./pages/Backstage";
import Features from "./pages/Features";
import News from "./pages/News";
import Timetable from "./pages/Timetable";
import Price from "./pages/Price";
import Workshop from "./pages/Workshop";
import EditNews from "./pages/EditNews";
import EditPrice from "./pages/EditPrice";
import EditWorkshop from "./pages/EditWorkshop";
import FeatureInformation from "./pages/FeatureInformation";
import NewsInformation from "./pages/NewsInformation";

function App() {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.userID);
  const [userUID, setUserUID] = useState("");
  const [login, setLogin] = useState("");
  const [allPubished, setAllPubished] = useState([]);

  useEffect(() => {
    const path = window.location.pathname;
    const templatePath = ["/", "/news", "/timetable", "/workshop", "/price"];
    const currentFestival = path.split("festival=")[1];

    const setupReduxStore = (res) => {
      console.log("keep mind!");
      console.log(res);
      dispatch(updatePeriod(res.festivalPeriod));
      dispatch(updateLocations(res.locations));
      dispatch(updateFeatures(res.features));
      dispatch(updateFestivalName(res.festivalName));
      dispatch(updateFestivalPathName(res.festivalPathName));
      dispatch(updateFestivalLogo(res.festivalLogo));
      dispatch(updateFestivalPost(res.festivalPost));
      dispatch(switchTab(res.features[0].featureID));
      dispatch(updateNews(res.news));
      dispatch(updatePrice(res.price));
      dispatch(updateTraffic(res.traffic));
      dispatch(updateWorkshop(res.workshop));
    };

    //判斷登入
    const monitorAuthState = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          dispatch(userLogin(currentUser.uid));
          setUserUID(currentUser.uid);
          setLogin("login");
          if (templatePath.some((item) => item === path)) {
            firebase
              .readFestivalData("r6KCeon7KBan1fSf1WWa3q3piSa2")
              .then((res) => {
                setupReduxStore(res);
              });
          } else {
            firebase.readFestivalData(currentUser.uid).then((res) => {
              setupReduxStore(res);
            });
          }
        } else {
          firebase
            .readFestivalData("r6KCeon7KBan1fSf1WWa3q3piSa2")
            .then((res) => {
              setupReduxStore(res);
            });
        }
      });
    };
    ///festival/:${item}
    //產生所有 routes
    firebase
      .getAllPubished()
      .then((festivalList) => {
        const allPublishedRoutes = festivalList.map((item, index) => {
          return (
            <>
              <Route
                key={index}
                path={`/festival=${item}`}
                element={<Index userUID={userUID} userState={"build"} />}
              />
              <Route
                key={index}
                path={`price/festival=${item}`}
                element={<Price userUID={userUID} userState={"build"} />}
              />
              <Route
                key={index}
                path={`news/festival=${item}`}
                element={<News userUID={userUID} userState={"build"} />}
              />
              <Route
                key={index}
                path={`timetable/festival=${item}`}
                element={<Timetable userUID={userUID} userState={"build"} />}
              />
              <Route
                key={index}
                path={`workshop/festival=${item}`}
                element={<Workshop userUID={userUID} userState={"build"} />}
              />
            </>
          );
        });
        setAllPubished(allPublishedRoutes);
        return festivalList;
      })
      .then((festivalList) => {
        // console.log(festivalList)
        if (festivalList.some((item) => item === currentFestival)) {
          firebase.readPublishedFestivalData(currentFestival).then((res) => {
            setupReduxStore(res);
          });
        } else {
          monitorAuthState();
        }
      });

    //判斷狀態

    // console.log(allPubishTitles.some( item => item === readFestival) )
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {allPubished}
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
        <Route path="backstage/news" element={<EditNews userUID={userUID} />} />
        <Route
          path="backstage/price"
          element={<EditPrice userUID={userUID} />}
        />

        <Route
          path="backstage/workshop"
          element={<EditWorkshop userUID={userUID} />}
        />
        {/*Preview */}
        <Route
          path="preview/timetable"
          element={<Timetable userUID={userUID} userState={"preview"} />}
        />
        <Route
          path="preview/timetable/:id"
          element={<Timetable userUID={userUID} userState={"preview"} />}
        />
        <Route
          path="preview/news"
          element={<News userUID={userUID} userState={"preview"} />}
        />
            <Route
          path="preview/news/:id"
          element={<NewsInformation userUID={userUID} userState={"preview"} />}
        />
        <Route
          path="preview/price"
          element={<Price userUID={userUID} userState={"preview"} />}
        />
        <Route
          path="/preview"
          element={<Index userUID={userUID} userState={"preview"} />}
        />
        <Route
          path="preview/workshop"
          element={<Workshop userUID={userUID} userState={"preview"} />}
        />
        <Route
          path="preview/feature-information"
          element={
            <FeatureInformation userUID={userUID} userState={"preview"} />
          }
        />
        <Route
          path="preview/feature-information/:id"
          element={
            <FeatureInformation userUID={userUID} userState={"preview"} />
          }
        />
      </Routes>
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
