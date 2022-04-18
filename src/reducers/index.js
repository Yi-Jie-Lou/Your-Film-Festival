import loggedReducer from "./login";
import periodReducer from "./getPeriod"
import locationsReducer from "./getLocations";
import featuresReducer from "./getFeatures"
import featureTabReducer from "./getCurrentTab"
import userStateReducer from "./getUserState";
import festivalNameReducer from "./getFestivalName";
import festivalPathNameReducer from "./getFestivalPathName"
import featuresImgsReducer from "./getFeaturesImgs";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    userID: loggedReducer,
    festivalPeriod: periodReducer,
    festivalLocations: locationsReducer,
    festivalName: festivalNameReducer,
    festivalPathName: festivalPathNameReducer,
    features: featuresReducer,
    featuresImgs: featuresImgsReducer,
    currentTab: featureTabReducer,
    state: userStateReducer
})

export default allReducers