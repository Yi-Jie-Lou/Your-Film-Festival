const festivalPostReducer = (state = "", action) => {
    switch(action.type){
        case 'GET_FESTIVAL_POST':
            return state = action.payload
        default:
            return state
    }
}


export default festivalPostReducer