const festivalLogoReducer = (state = "", action) => {
    switch(action.type){
        case 'GET_FESTIVAL_LOGO':
            return state = action.payload
        default:
            return state
    }
}


export default festivalLogoReducer