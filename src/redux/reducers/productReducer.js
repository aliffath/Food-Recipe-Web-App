const initialState = {
  data: null,
  message: "",
  isLoading: false,
  isError: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POST_RECIPE_PENDING" |
      "UPDATE_RECIPE_PENDING" |
      "GET_DETAIL_PENDING" |
      "DELETE_PRODUCT_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "POST_RECIPE_SUCCESS" |
      "UPDATE_RECIPE_SUCCESS" |
      "GET_DETAIL_SUCCESS" |
      "DELETE_PRODUCT_SUCCESS":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        message: "",
        isError: false,
      };
    case "POST_RECIPE_FAILED" |
      "UPDATE_RECIPE_FAILED" |
      "GET_DETAIL_FAILED" |
      "DELETE_PRODUCT_FAILED":
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

export default productReducer;
