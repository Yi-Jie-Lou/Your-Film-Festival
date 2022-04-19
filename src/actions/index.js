export const userLogin = (payload) => {
    return {
        type: 'SIGN_IN',
        payload
    }
}

export const updatePeriod = (payload) => {
    return {
        type: 'GET_PERIOD',
        payload
    }
}

export const updateLocations = (payload) => {
    return {
        type: 'GET_LOCATIONS',
        payload
    }
}

export const updateFeatures = (payload) => {
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

export const updateState = (payload) => {
    return {
        type: 'GETSTATE',
        payload
    }
}


export const updateFestivalName = (payload) => {
    return {
        type: 'GET_FESTIVAL_NAME',
        payload
    }
}

export const updateFestivalPathName = (payload) => {
    return {
        type: 'GET_FESTIVAL_PATH_NAME',
        payload
    }
}

export const updateFeaturesImgs = (payload) => {
    return {
        type: 'GET_FEATURES_IMGS',
        payload
    }
}

export const updateFestivalPost = (payload) => {
    return {
        type: 'GET_FESTIVAL_POST',
        payload
    }
}

export const updateFestivalLogo = (payload) => {
    return {
        type: 'GET_FESTIVAL_LOGO',
        payload
    }
}