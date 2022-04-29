const guideReducer = (state = true, action) => {
    switch(action.type){
        case 'FINISH':
            return state = action.payload
        default:
            return state
    }
}

export default guideReducer