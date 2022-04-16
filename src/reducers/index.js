import loggedReducer from "./login";
import periodReducer from "./getPeriod"
import { combineReducers } from "redux";

const allReducers = combineReducers({
    userID: loggedReducer,
    festivalPeriod: periodReducer
})

export default allReducers