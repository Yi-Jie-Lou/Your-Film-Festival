const locationsReducer = (state = [], action) => {
    switch(action.type){
        case 'GET_LOCATIONS':
            return state = action.payload
        default:
            return state
    }
}


export default locationsReducer