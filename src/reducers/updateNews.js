const newsReducer = (state = [], action) => {
    switch(action.type){
        case 'UPDATE_NEWS':
            return state = action.payload
        default:
            return state
    }
}


export default newsReducer