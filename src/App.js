import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types";

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
  updateTextColor,
  updateFestivalStart,
  updateFestivalEnd,
  getUserEmail,
} from "./actions";
import { firebase } from "./utils/firebase-config";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Backstage from "./pages/Backstage";
import Features from "./pages/EditFeatures";
import News from "./pages/News";
import Timetable from "./pages/Timetable";
import Price from "./pages/Price";
import Workshop from "./pages/Workshop";
import EditNews from "./pages/EditNews";
import EditPrice from "./pages/EditPrice";
import EditWorkshop from "./pages/EditWorkshop";
import FeatureDetails from "./pages/FeatureDetails";
import NewsDetails from "./pages/NewsDetails";
import WorkshopDetails from "./pages/WorkshopDetails";
import EditFooterAndColor from "./pages/EditFooterAndColor";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";
import Loading from "./components/global/Loading";
import RedirectPage from "./components/global/Redirect";
import ScrollToTop from "./components/global/ScrollToTop";

function App() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.state);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const path = window.location.pathname;
    const currentFestival = path.split("festival=")[1];

    const setupReduxStore = (res) => {
      console.log("Keep mind of firebase usage！ : init redux data");
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
      dispatch(updateTextColor(res.textColor));
      dispatch(updateFestivalStart(res.festivalStart));
      dispatch(updateFestivalEnd(res.festivalEnd));
      dispatch(getUserEmail(res.userEmail));
    };

    const monitorAuthState = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          dispatch(userLogin(currentUser.uid));
          dispatch(updateState("login"));
          firebase
            .readFestivalData(currentUser.uid)
            .then((res) => {
              setupReduxStore(res);
            })
            .then((_) => {
              setIsLoading(false);
            });
        } else {
          dispatch(userLogin(""));
          dispatch(updateState("logout"));
          setIsLoading(false);
        }
      });
    };

    firebase.getAllPubished().then((festivalList) => {
      if (festivalList.some((item) => item === currentFestival)) {
        firebase
          .readPublishedFestivalData(currentFestival)
          .then((res) => {
            setupReduxStore(res);
          })
          .then((_) => {
            setIsLoading(false);
          });
      } else {
        monitorAuthState();
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="preview"
            element={<PreviewRouter isLoading={isLoading} />}
          >
            <Route path="" element={<Index userState="preview" />} />
            <Route
              path="feature-details/:id"
              element={<FeatureDetails userState="preview" />}
            />
            <Route path="news" element={<News userState="preview" />} />
            <Route path="news/:id" element={<NewsDetails />} />
            <Route path="price" element={<Price />} />
            <Route
              path="timetable"
              element={<Timetable userState="preview" />}
            />
            <Route
              path="timetable/:id"
              element={<Timetable userState="preview" />}
            />
            <Route path="workshop" element={<Workshop userState="preview" />} />
            <Route path="workshop/:id" element={<WorkshopDetails />} />
          </Route>

          <Route path="build" element={<BuildRouter isLoading={isLoading} />}>
            <Route path=":festival" element={<Index userState="build" />} />
            <Route
              path="feature-details/:id/:festival"
              element={<FeatureDetails userState="build" />}
            />
            <Route
              path="price/:festival"
              element={<Price userState="build" />}
            />
            <Route path="news/:festival" element={<News userState="build" />} />
            <Route
              path="news/:id/:festival"
              element={<NewsDetails userState="build" />}
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
              element={<WorkshopDetails />}
            />
          </Route>

          <Route
            path="backstage"
            element={
              login === "login" ? (
                <BackstageRouter isLoading={isLoading} />
              ) : (
                <RedirectPage />
              )
            }
          >
            <Route path="" element={<Backstage />} />
            <Route path="features" element={<Features />} />
            <Route path="news" element={<EditNews />} />
            <Route path="price" element={<EditPrice />} />
            <Route path="workshop" element={<EditWorkshop />} />
            <Route path="edit-footer-color" element={<EditFooterAndColor />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}

function BackstageRouter({isLoading}) {
  return (
    <>
      {isLoading ? (
        <div className="h-screen vertical">
          <Loading />
        </div>
      ) : (
        <>
          <Header userState="editing" />
          <Outlet />
          <Footer userState="editing" />
        </>
      )}
    </>
  );
}

function PreviewRouter({isLoading}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="h-screen vertical">
          <Loading />
        </div>
      ) : (
        <>
          <Header userState="preview" />
          <Outlet />
          <Footer userState="preview" />
        </>
      )}
    </>
  )
}

function BuildRouter({isLoading}) {
  return (
    <>
      {isLoading ? (
        <div className="h-screen vertical">
          <Loading />
        </div>
      ) : (
        <>
          <Header userState="build" />
          <Outlet />
          <Footer userState="build" />
        </>
      )}
    </>
  );
}

BackstageRouter.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
PreviewRouter.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
BuildRouter.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default App;
