export default (state, action) => {
  switch(action.type) {
    case "Change_type":
      return {
        ...state,
        type: action.payload
      };
    default:
      return state;
  }
}