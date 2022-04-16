const featuresReducer = (state = [], action) => {
    switch(action.type){
        case 'GET_FEATURES':
            return state = action.payload
        default:
            return state
    }
}


export default featuresReducer