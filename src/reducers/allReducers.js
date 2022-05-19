export const guideReducer = (state = true, action) => {
  switch (action.type) {
    case 'FINISH':
      return (state = action.payload);
    default:
      return state;
  }
};

export const loggedReducer = (state = '', action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return (state = action.payload);
    default:
      return state;
  }
};

export const emailReducer = (state = '', action) => {
  switch (action.type) {
    case 'GET_EMAIL':
      return (state = action.payload);
    default:
      return state;
  }
};

export const featureTabReducer = (state = '', action) => {
  switch (action.type) {
    case 'SWITCH_FEATURE_TAB':
      return (state = action.payload);
    default:
      return state;
  }
};

export const featuresReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_FEATURES':
      return (state = action.payload);
    default:
      return state;
  }
};

export const festivalEndReducer = (state = new Date(), action) => {
  switch (action.type) {
    case 'UPDATE_END_DATE':
      return (state = action.payload);
    default:
      return state;
  }
};

export const festivalLogoReducer = (state = '', action) => {
  switch (action.type) {
    case 'GET_FESTIVAL_LOGO':
      return (state = action.payload);
    default:
      return state;
  }
};

export const festivalNameReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_FESTIVAL_NAME':
      return (state = action.payload);
    default:
      return state;
  }
};

export const festivalPathNameReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_FESTIVAL_PATH_NAME':
      return (state = action.payload);
    default:
      return state;
  }
};

export const festivalPostReducer = (state = '', action) => {
  switch (action.type) {
    case 'GET_FESTIVAL_POST':
      return (state = action.payload);
    default:
      return state;
  }
};

export const festivalStartReducer = (state = new Date(), action) => {
  switch (action.type) {
    case 'UPDATE_START_DATE':
      return (state = action.payload);
    default:
      return state;
  }
};

export const locationsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_LOCATIONS':
      return (state = action.payload);
    default:
      return state;
  }
};

export const newsReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_NEWS':
      return (state = action.payload);
    default:
      return state;
  }
};

export const periodReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_PERIOD':
      return (state = action.payload);
    default:
      return state;
  }
};

export const priceReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_PRICE':
      return (state = action.payload);
    default:
      return state;
  }
};

export const primaryColorReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_PRIMARY_COLOR':
      return (state = action.payload);
    default:
      return state;
  }
};

export const secondaryColorReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_SECONDARY_COLOR':
      return (state = action.payload);
    default:
      return state;
  }
};

export const textColorReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_TEXT_COLOR':
      return (state = action.payload);
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
      return (state = action.payload);
    default:
      return state;
  }
};

export const trafficReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_TRAFFIC':
      return (state = action.payload);
    default:
      return state;
  }
};

export const userStateReducer = (state = '', action) => {
  switch (action.type) {
    case 'GETSTATE':
      return (state = action.payload);
    default:
      return state;
  }
};

export const workshopReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_WORKSHOP':
      return (state = action.payload);
    default:
      return state;
  }
};
