const featuresImgsReducer = (state = ["","",""], action) => {
    switch(action.type){
        case 'GET_FEATURES_IMGS':
            return state = action.payload
        default:
            return state
    }
}


export default featuresImgsReducer