import { REGISTER_FAIL, REGISTER_SUCCESS } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAIL:
      return { ...state, token: null, isAuthenticated: false, loading: false };

    default:
      return state;
  }
};
