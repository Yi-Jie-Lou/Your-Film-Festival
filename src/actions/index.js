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