export default (state, action) => {
  switch(action.type) {
    case "Change_type":
      return {
        ...state,
        type: action.payload
      };
    case "Set_number":
      return {
        ...state,
        number: action.payload
      }
    default:
      return state;
  }
}