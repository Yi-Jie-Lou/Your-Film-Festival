const sponsorReducer = (state = {text:["",""],img:[""]}, action) => {
    switch(action.type){
        case 'UPDATE_SPONSOR':
            return state = action.payload
        default:
            return state
    }
}


export default sponsorReducer