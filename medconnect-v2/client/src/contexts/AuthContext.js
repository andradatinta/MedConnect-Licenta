import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000",
});

const AuthContext = createContext();

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  loggedIn: localStorage.getItem("user") !== null, // false
  loading: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_START":
    case "LOGIN_START":
      return { ...state, loading: true };
    case "UPDATE_PASSWORD_START":
      return { ...state, loading: true };
    case "UPDATE_EMAIL_START":
      return { ...state, loading: true };
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, loggedIn: true, user: action.payload };
    case "UPDATE_PASSWORD_SUCCESS":
      return { ...state, loading: false, user: action.payload, loggedIn: true };
    case "UPDATE_EMAIL_SUCCESS":
      return { ...state, loading: false, user: action.payload, loggedIn: true };
    case "REGISTER_FAILURE":
    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_PASSWORD_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_EMAIL_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return { ...initialState, loggedIn: false };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  // const [loggedIn, setLoggedIn] = useState(!!state.user);
  // const loggedIn = useMemo(() => !!state.user, [state.user]);

  // useEffect(() => {
  //   console.log("AuthProvider state.user changed:", state.user);
  //   setLoggedIn(!!state.user);
  // }, [state.user]);

  const register = async (data, endpoint) => {
    try {
      dispatch({ type: "REGISTER_START" });

      const response = await api.post(`/api/users/signup${endpoint}`, data);

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: response.data,
      });

      // Log in the user right after registering
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      dispatch({
        type: "REGISTER_FAILURE",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      return error.response ? error.response.data.message : error.message;
    }
  };

  const login = async (data) => {
    try {
      dispatch({ type: "LOGIN_START" });

      const response = await api.post("/api/users/login", data);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data,
      });

      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      return error.response ? error.response.data.message : error.message;
    }
  };

  const logout = () => {
    // Clear the user from local storage
    console.log("Logout function called");
    localStorage.removeItem("user");

    console.log("User after logout:", localStorage.getItem("user"));

    // Dispatch the LOGOUT action to update the state
    dispatch({ type: "LOGOUT" });
  };

  const updatePassword = async (data) => {
    try {
      dispatch({ type: "UPDATE_PASSWORD_START" }); // You may need to define this in your reducer

      const config = {
        headers: {
          "Content-Type": "application/json",
          // add the Authorization header with the user's token
          Authorization: `Bearer ${state.user.token}`,
        },
      };

      // Assuming your password change endpoint is /api/users/change-password
      const response = await api.put("/api/users/updatePassword", data, config);

      dispatch({
        type: "UPDATE_PASSWORD_SUCCESS",
        payload: state.user, // You may need to define this in your reducer
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_PASSWORD_FAILURE", // You may need to define this in your reducer
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      return error.response ? error.response.data.message : error.message;
    }
  };

  const updateEmail = async (data) => {
    try {
      dispatch({ type: "UPDATE_EMAIL_START" }); // You may need to define this in your reducer

      const config = {
        headers: {
          "Content-Type": "application/json",
          // add the Authorization header with the user's token
          Authorization: `Bearer ${state.user.token}`,
        },
      };

      // Assuming your password change endpoint is /api/users/change-password
      const response = await api.put("/api/users/updateEmail", data, config);

      dispatch({
        type: "UPDATE_EMAIL_SUCCESS",
        payload: response.data.user,
      });
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Update localStorage with the updated user data
    } catch (error) {
      dispatch({
        type: "UPDATE_EMAIL_FAILURE", // You may need to define this in your reducer
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      return error.response ? error.response.data.message : error.message;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        register,
        login,
        logout,
        updatePassword,
        updateEmail,
        loggedIn: state.loggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
