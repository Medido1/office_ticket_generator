import {initialState} from "./GlobalContext";

const priceMap = {
  "Anapath": 2000,
  "Cytoponction": 1500,
  "F.C.V": 1000
}

function AppReducer(state, action)  {
  switch(action.type) {
    case "CHANGE_TYPE":
      return {
        ...state,
        type: action.payload,
        UnitPrice: priceMap[action.payload] || "",
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
        UnitPrice : action.payload
      }
    case "SET_PAYED_SUM":
      return {
        ...state,
        payedSum : action.payload
      }
    case "RESET_STATE":
      return {...initialState}
    case "SET_PHONE_NUMBER":
      return {
        ...state,
        phoneNumber : action.payload
      }
    default:
      return state;
  }
}

export default AppReducer;