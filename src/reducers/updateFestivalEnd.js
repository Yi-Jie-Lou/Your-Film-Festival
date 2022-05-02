const festivalEndReducer = (state = new Date(), action) => {
    switch(action.type){
        case 'UPDATE_END_DATE':
            return state = action.payload
        default:
            return state
    }
}


export default festivalEndReducer