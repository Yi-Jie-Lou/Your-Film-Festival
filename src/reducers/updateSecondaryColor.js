const secondaryColorReducer = (state = "", action) => {
    switch(action.type){
        case 'UPDATE_SECONDARY_COLOR':
            return state = action.payload
        default:
            return state
    }
}


export default secondaryColorReducer