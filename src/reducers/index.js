import {
  loggedReducer,
  periodReducer,
  locationsReducer,
  featuresReducer,
  featureTabReducer,
  userStateReducer,
  festivalNameReducer,
  festivalPathNameReducer,
  festivalPostReducer,
  festivalLogoReducer,
  newsReducer,
  priceReducer,
  trafficReducer,
  workshopReducer,
  sponsorReducer,
  primaryColorReducer,
  secondaryColorReducer,
  guideReducer,
  festivalStartReducer,
  festivalEndReducer,
} from "./allReducers.js";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  userID: loggedReducer,
  festivalPeriod: periodReducer,
  festivalLocations: locationsReducer,
  festivalName: festivalNameReducer,
  festivalPathName: festivalPathNameReducer,
  festivalPost: festivalPostReducer,
  festivalLogo: festivalLogoReducer,
  festivalStart: festivalStartReducer,
  festivalEnd: festivalEndReducer,
  features: featuresReducer,
  currentTab: featureTabReducer,
  state: userStateReducer,
  news: newsReducer,
  price: priceReducer,
  traffic: trafficReducer,
  workshop: workshopReducer,
  sponsor: sponsorReducer,
  primaryColor: primaryColorReducer,
  secondaryColor: secondaryColorReducer,
  isGuide: guideReducer,
});

export default allReducers;
