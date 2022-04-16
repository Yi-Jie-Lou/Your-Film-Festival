const periodReducer = (state = [], action) => {
    switch(action.type){
        case 'GET_PERIOD':
            return state = action.payload
        default:
            return state
    }
}


export default periodReducer