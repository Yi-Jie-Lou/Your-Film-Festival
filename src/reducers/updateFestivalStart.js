const festivalStartReducer = (state = new Date(), action) => {
    switch(action.type){
        case 'UPDATE_START_DATE':
            return state = action.payload
        default:
            return state
    }
}


export default festivalStartReducer