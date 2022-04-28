import loggedReducer from "./login";
import periodReducer from "./updatePeriod";
import locationsReducer from "./updateLocations";
import featuresReducer from "./updateFeatures";
import featureTabReducer from "./updateCurrentTab";
import userStateReducer from "./updateUserState";
import festivalNameReducer from "./updateFestivalName";
import festivalPathNameReducer from "./updateFestivalPathName";
import festivalPostReducer from "./updateFestivalPost";
import festivalLogoReducer from "./updateFestivalLogo";
import newsReducer from "./updateNews"
import priceReducer from "./updatePrice";
import trafficReducer from "./updateTraffic";
import workshopReducer from "./updateWorkshop";
import sponsorReducer from "./updateSponsor";
import primaryColorReducer from "./updatePrimaryColor"
import secondaryColorReducer from "./updateSecondaryColor"
import { combineReducers } from "redux";

const allReducers = combineReducers({
  userID: loggedReducer,
  festivalPeriod: periodReducer,
  festivalLocations: locationsReducer,
  festivalName: festivalNameReducer,
  festivalPathName: festivalPathNameReducer,
  festivalPost: festivalPostReducer,
  festivalLogo: festivalLogoReducer,
  features: featuresReducer,
  currentTab: featureTabReducer,
  state: userStateReducer,
  news: newsReducer,
  price: priceReducer,
  traffic: trafficReducer,
  workshop: workshopReducer,
  sponsor: sponsorReducer,
  primaryColor: primaryColorReducer,
  secondaryColor: secondaryColorReducer
});

export default allReducers;
