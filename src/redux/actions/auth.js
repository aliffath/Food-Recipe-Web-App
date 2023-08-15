import axios from "axios";
import { toast } from "react-toastify";

export const actionLogin = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "AUTH_LOGIN_PENDING" });
    const result = await axios.post(
      import.meta.env.VITE_REACT_BACKEND_URL + `/login`,
      data
    );
    localStorage.setItem("token", result.data.token);
    dispatch({ payload: result.data, type: "AUTH_LOGIN_SUCCESS" });
    toast.success("Login Successfully");
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  } catch (error) {
    console.log(error);
    dispatch({
      payload: error.response.data.message,
      type: "AUTH_LOGIN_FAILED",
    });
    toast.error(error.response.data.message);
  }
};

export const actionRegister = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "AUTH_REGISTER_PENDING" });
    const result = await axios.post(
      import.meta.env.VITE_REACT_BACKEND_URL + `/register`,
      data
    );
    console.log(result);
    dispatch({ payload: result.data, type: "AUTH_REGISTER_SUCCESS" });
    toast.success("Register Successfully");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  } catch (error) {
    console.log(error);
    dispatch({
      payload: error.response.data.message,
      type: "AUTH_LOGIN_FAILED",
    });
    toast.error(error.response.data.message);
  }
};
