const primaryColorReducer = (state = "", action) => {
    switch(action.type){
        case 'UPDATE_PRIMARY_COLOR':
            return state = action.payload
        default:
            return state
    }
}


export default primaryColorReducer