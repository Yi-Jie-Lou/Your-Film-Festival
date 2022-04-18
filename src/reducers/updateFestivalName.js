const festivalNameReducer = (state = [], action) => {
    switch(action.type){
        case 'GET_FESTIVAL_NAME':
            return state = action.payload
        default:
            return state
    }
}


export default festivalNameReducer