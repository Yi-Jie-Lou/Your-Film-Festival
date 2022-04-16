import loggedReducer from "./login";
import periodReducer from "./getPeriod"
import locationsReducer from "./getLocations";
import featuresReducer from "./getFeatures"
import featureTabReducer from "./getCurrentTab"
import { combineReducers } from "redux";

const allReducers = combineReducers({
    userID: loggedReducer,
    festivalPeriod: periodReducer,
    festivalLocations: locationsReducer,
    features: featuresReducer,
    currentTab: featureTabReducer
})

export default allReducers