const priceReducer = (state = [], action) => {
    switch(action.type){
        case 'UPDATE_PRICE':
            return state = action.payload
        default:
            return state
    }
}


export default priceReducer