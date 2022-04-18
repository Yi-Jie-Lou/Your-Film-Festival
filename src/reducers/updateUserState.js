const userStateReducer = (state = "", action) => {
  switch (action.type) {
    case "GETSTATE":
      return state =  action.payload;
    default:
      return state;
  }
};

export default userStateReducer;
