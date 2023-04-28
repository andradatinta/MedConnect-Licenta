import React, { createContext, useReducer } from "react";
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
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      return { ...state, loading: false, user: action.payload, loggedIn: true };
    case "REGISTER_FAILURE":
    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return { ...initialState, loggedIn: false };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
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

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        register,
        login,
        logout,
        loggedIn: state.loggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
