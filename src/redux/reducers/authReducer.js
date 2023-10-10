const initialState = {
  data: null,
  message: "",
  isLoading: false,
  isError: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_LOGIN_PENDING" |
      "AUTH_REGISTER_PENDING" |
      "AUTH_UPDATE_PENDING" |
      "GET_PROFILE_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "AUTH_LOGIN_SUCCESS" |
      "AUTH_REGISTER_SUCCESS" |
      "AUTH_UPDATE_SUCCESS" |
      "GET_PROFILE_SUCCESS":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        message: "",
        isError: false,
      };
    case "AUTH_LOGIN_FAILED" |
      "AUTH_REGISTER_FAILED" |
      "AUTH_UPDATE_FAILED" |
      "GET_PROFILE_FAILED":
      return {
        ...state,
        data: null,
        message: action.payload,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default authReducer;
