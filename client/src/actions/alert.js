import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuid } from "uuid";
//If you want to dispatch several actions in one method you can do like that:
//function dispatch more then one action so ()=>dispatch=>{}
//because of thunk can return function not object
// Asynchronous middleware like redux-thunk wraps the store's dispatch() method and allows you to dispatch something other than actions, for example, functions or Promises.
//https://redux.js.org/advanced/async-flow
export const setAlert = (msg, alertType,timeout=5000) => (dispatch) => {
  const id = uuid();
  //send SET_ALLERT with different  payload for use in state
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  //remove alert
  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id ,
    });
  }, timeout);
};
