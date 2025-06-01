import {initialState} from "./GlobalContext";

const priceMap = {
  "Anapath": 2000,
  "Cytoponction": 1500,
  "F.C.V": 1000
}

export default (state, action) => {
  switch(action.type) {
    case "Change_type":
      return {
        ...state,
        type: action.payload,
        totalPrice: priceMap[action.payload] || "",
      };
    case "Set_number":
      return {
        ...state,
        number: action.payload
      }
    case "Set_name":
      return {
        ...state,
        name: action.payload
      }
    case "Set_totalPrice":
      return {
        ...state,
        totalPrice : action.payload
      }
    case "Set_payedSum":
      return {
        ...state,
        payedSum : action.payload
      }
    case "Reset_State":
      return {...initialState}
    default:
      return state;
  }
}