export const guideReducer = (state = true, action) => {
  switch (action.type) {
    case 'FINISH':
      return action.payload;
    default:
      return state;
  }
};

export const loggedReducer = (state = '', action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return action.payload;
    default:
      return state;
  }
};

export const emailReducer = (state = '', action) => {
  switch (action.type) {
    case 'GET_EMAIL':
      return action.payload;
    default:
      return state;
  }
};

export const featureTabReducer = (state = '', action) => {
  switch (action.type) {
    case 'SWITCH_FEATURE_TAB':
      return action.payload;
    default:
      return state;
  }
};

export const featuresReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_FEATURES':
      return action.payload;
    default:
      return state;
  }
};

export const festivalEndReducer = (state = new Date(), action) => {
  switch (action.type) {
    case 'UPDATE_END_DATE':
      return action.payload;
    default:
      return state;
  }
};

export const festivalLogoReducer = (state = '', action) => {
  switch (action.type) {
    case 'GET_FESTIVAL_LOGO':
      return action.payload;
    default:
      return state;
  }
};

export const festivalNameReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_FESTIVAL_NAME':
      return action.payload;
    default:
      return state;
  }
};

export const festivalPathNameReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_FESTIVAL_PATH_NAME':
      return action.payload;
    default:
      return state;
  }
};

export const festivalPostReducer = (state = '', action) => {
  switch (action.type) {
    case 'GET_FESTIVAL_POST':
      return action.payload;
    default:
      return state;
  }
};

export const festivalStartReducer = (state = new Date(), action) => {
  switch (action.type) {
    case 'UPDATE_START_DATE':
      return action.payload;
    default:
      return state;
  }
};

export const locationsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_LOCATIONS':
      return action.payload;
    default:
      return state;
  }
};

export const newsReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_NEWS':
      return action.payload;
    default:
      return state;
  }
};

export const periodReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_PERIOD':
      return action.payload;
    default:
      return state;
  }
};

export const priceReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_PRICE':
      return action.payload;
    default:
      return state;
  }
};

export const primaryColorReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_PRIMARY_COLOR':
      return action.payload;
    default:
      return state;
  }
};

export const secondaryColorReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_SECONDARY_COLOR':
      return action.payload;
    default:
      return state;
  }
};

export const textColorReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_TEXT_COLOR':
      return action.payload;
    default:
      return state;
  }
};

export const sponsorReducer = (
  state = { text: ['', ''], img: [''] },
  action
) => {
  switch (action.type) {
    case 'UPDATE_SPONSOR':
      return action.payload;
    default:
      return state;
  }
};

export const trafficReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_TRAFFIC':
      return action.payload;
    default:
      return state;
  }
};

export const userStateReducer = (state = '', action) => {
  switch (action.type) {
    case 'GETSTATE':
      return action.payload;
    default:
      return state;
  }
};

export const workshopReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_WORKSHOP':
      return action.payload;
    default:
      return state;
  }
};
