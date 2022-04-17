import loggedReducer from "./login";
import periodReducer from "./getPeriod"
import locationsReducer from "./getLocations";
import featuresReducer from "./getFeatures"
import featureTabReducer from "./getCurrentTab"
import userStateReducer from "./getUserState";
import FestivalNameReducer from "./getFestivalName";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    userID: loggedReducer,
    festivalPeriod: periodReducer,
    festivalLocations: locationsReducer,
    festivalName: FestivalNameReducer,
    features: featuresReducer,
    currentTab: featureTabReducer,
    state: userStateReducer
})

export default allReducers