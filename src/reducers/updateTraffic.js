const trafficReducer = (state = [], action) => {
    switch(action.type){
        case 'UPDATE_TRAFFIC':
            return state = action.payload
        default:
            return state
    }
}


export default trafficReducer