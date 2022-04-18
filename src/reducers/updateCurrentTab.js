const featureTabReducer = (state = "", action) => {
    switch(action.type){
        case 'SWITCH_FEATURE_TAB':
            return state = action.payload
        default:
            return state
    }
}

export default featureTabReducer