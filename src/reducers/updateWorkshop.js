const workshopReducer = (state = "", action) => {
    switch (action.type) {
      case "UPDATE_WORKSHOP":
        return state =  action.payload;
      default:
        return state;
    }
  };
  
  export default workshopReducer;