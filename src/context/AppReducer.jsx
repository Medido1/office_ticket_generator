import {initialState} from "./GlobalContext";

const priceMap = {
  "Anapath": 2000,
  "Cytoponction": 1500,
  "F.C.V": 1000
}

export default (state, action) => {
  switch(action.type) {
    case "CHANGE_TYPE":
      return {
        ...state,
        type: action.payload,
        totalPrice: priceMap[action.payload] || "",
      };
    case "SET_NUMBER":
      return {
        ...state,
        number: action.payload
      }
    case "SET_NAME":
      return {
        ...state,
        name: action.payload
      }
    case "SET_TOTAL_PRICE":
      return {
        ...state,
        totalPrice : action.payload
      }
    case "SET_PAYED_SUM":
      return {
        ...state,
        payedSum : action.payload
      }
    case "RESET_STATE":
      return {...initialState}
    default:
      return state;
  }
}