export const userLogin = (payload) => {
    return {
        type: 'SIGN_IN',
        payload
    }
}

export const getPeriod = (payload) => {
    return {
        type: 'GET_PERIOD',
        payload
    }
}

export const getLocations = (payload) => {
    return {
        type: 'GET_LOCATIONS',
        payload
    }
}

export const getFeatures = (payload) => {
    return {
        type: 'GET_FEATURES',
        payload
    }
}

export const switchTab = (payload) => {
    return {
        type: 'SWITCH_FEATURE_TAB',
        payload
    }
}

export const getState = (payload) => {
    return {
        type: 'GETSTATE',
        payload
    }
}


export const getFestivalName = (payload) => {
    return {
        type: 'GET_FESTIVAL_NAME',
        payload
    }
}