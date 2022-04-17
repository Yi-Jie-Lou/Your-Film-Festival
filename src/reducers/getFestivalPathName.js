const festivalPathNameReducer = (state = [], action) => {
    switch(action.type){
        case 'GET_FESTIVAL_PATH_NAME':
            return state = action.payload
        default:
            return state
    }
}


export default festivalPathNameReducer