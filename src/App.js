import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  Routes,
  Route,
  BrowserRouter,
  useParams,
  Outlet,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  userLogin,
  updateState,
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
  updateSponsor,
  updatePrimaryColor,
  updateSecondaryColor,
  isGuide,
  updateFestivalStart,
  updateFestivalEnd,
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
import WorkshopInformation from "./pages/WorkshopInformation";
import EditFooterAndColor from "./pages/EditFooterAndColor";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.userID);
  const login = useSelector((state) => state.state);
  const [userUID, setUserUID] = useState("");
  const currentID = useParams();
  console.log(currentID);

  useEffect(() => {
    const path = window.location.pathname;
    const templatePath = [
      "/",
      "/news",
      "/timetable",
      "/workshop",
      "/price",
      "/login",
    ];
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
      dispatch(updateSponsor(res.sponsor));
      dispatch(updatePrimaryColor(res.primaryColor));
      dispatch(updateSecondaryColor(res.secondaryColor));
      dispatch(isGuide(res.isGuide));
      dispatch(updateFestivalStart(res.festivalStart));
      dispatch(updateFestivalEnd(res.festivalEnd));
    };

    //判斷登入
    const monitorAuthState = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          dispatch(userLogin(currentUser.uid));
          dispatch(updateState("login"));
          setUserUID(currentUser.uid);
          if (templatePath.some((item) => item === path)) {
            firebase
              .readFestivalData("BI9JlWinAzS8xdOnl1BrtUKPY1A3")
              .then((res) => {
                setupReduxStore(res);
              });
          } else {
            firebase.readFestivalData(currentUser.uid).then((res) => {
              setupReduxStore(res);
              console.log("wrong");
            });
          }
        } else {
          dispatch(userLogin(""));
          dispatch(updateState("logout"));
          firebase
            .readFestivalData("BI9JlWinAzS8xdOnl1BrtUKPY1A3")
            .then((res) => {
              setupReduxStore(res);
            });
        }
      });
    };

    firebase.getAllPubished().then((festivalList) => {
      if (festivalList.some((item) => item === currentFestival)) {
        firebase.readPublishedFestivalData(currentFestival).then((res) => {
          setupReduxStore(res);
          console.log("correct");
        });
      } else {
        monitorAuthState();
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />

        {/*Template Pages*/}
        <Route path="/" element={<TemplateRouter userState={login} />}>
          <Route path="" element={<Index userState={login} />} />
          <Route
            path="feature-information/:id"
            element={<FeatureInformation userState={login} />}
          />
          <Route path="news" element={<News userState={login} />} />
          <Route path="news/:id" element={<NewsInformation />} />
          <Route path="price" element={<Price />} />
          <Route path="timetable" element={<Timetable userState={login} />} />
          <Route
            path="timetable/:id"
            element={<Timetable userState={login} />}
          />
          <Route path="workshop" element={<Workshop userState={login} />} />
          <Route path="workshop/:id" element={<WorkshopInformation />} />
        </Route>

        {/*Preview Pages*/}
        <Route path="preview" element={<PreviewRouter />}>
          <Route path="" element={<Index userState="preview" />} />
          <Route
            path="feature-information/:id"
            element={<FeatureInformation userState="preview" />}
          />
          <Route path="news" element={<News userState="preview" />} />
          <Route path="news/:id" element={<NewsInformation />} />
          <Route path="price" element={<Price />} />
          <Route path="timetable" element={<Timetable userState="preview" />} />
          <Route
            path="timetable/:id"
            element={<Timetable userState="preview" />}
          />
          <Route path="workshop" element={<Workshop userState="preview" />} />
          <Route path="workshop/:id" element={<WorkshopInformation />} />
        </Route>

        {/*Build Pages*/}
        <Route path="build" element={<BuildRouter userState="build" />}>
          <Route path=":festival" element={<Index userState="build" />} />
          <Route
            path="feature-information/:id/:festival"
            element={<FeatureInformation userState="build" />}
          />
          <Route path="price/:festival" element={<Price userState="build" />} />
          <Route path="news/:festival" element={<News userState="build" />} />
          <Route
            path="news/:id/:festival"
            element={<NewsInformation userState="build" />}
          />
          <Route
            path="timetable/:festival"
            element={<Timetable userState="build" />}
          />
          <Route
            path="timetable/:id/:festival"
            element={<Timetable userState="build" />}
          />
          <Route
            path="workshop/:festival"
            element={<Workshop userState="build" />}
          />
          <Route
            path="workshop/:id/:festival"
            element={<WorkshopInformation />}
          />
        </Route>

        {/*Backstage Pages*/}
        <Route path="backstage" element={<BackstageRouter />}>
          <Route path="" element={<Backstage />} />
          <Route path="features" element={<Features />} />
          <Route path="news" element={<EditNews />} />
          <Route path="price" element={<EditPrice />} />
          <Route path="workshop" element={<EditWorkshop />} />
          <Route path="edit-footer-color" element={<EditFooterAndColor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function TemplateRouter(props) {
  return (
    <>
      <Header userState={props.userState} />
      <Outlet />
      <Footer userState={props.userState} />
    </>
  );
}

function BackstageRouter() {
  return (
    <>
      <Header userState={"editing"} />
      <Outlet />
      <Footer userState={"editing"} />
    </>
  );
}

function PreviewRouter() {
  return (
    <>
      <Header userState={"preview"} />
      <Outlet />
      <Footer userState={"preview"} />
    </>
  );
}

function BuildRouter() {
  return (
    <>
      <Header userState={"build"} />
      <Outlet />
      <Footer userState={"build"} />
    </>
  );
}
export default App;
