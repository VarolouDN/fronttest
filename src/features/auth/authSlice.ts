import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "../../types";

const initialState: Auth = {
  userName: "",
  password: "",
  isAuth: false,
  authError: "",
};
const host = "https://backtest-omega.vercel.app";
//const host = "http://localhost:5000";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: {
      prepare(userName, password): any {
        return {
          payload: { userName, password },
        };
      },

      reducer(state, action) {
        state.userName = action.payload.userName;
        state.password = action.payload.password;
        state.isAuth = true;
      },
    },
    error(state, action) {
      state.authError = action.payload;
    },
  },
});

export function login(userName: string, password: string, navigate: any) {
  return function (dispatch: any) {
    fetch(`${host}/api/auth/login`, {
      method: "post",
      body: JSON.stringify({ username: userName, password: password }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.success /*message === "Authentication successful."*/) {
          dispatch({ type: "auth/login", payload: { userName, password } });
          navigate("/table");
        } else throw new Error(data.error);
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "auth/error", payload: error.message });
        alert(error.message);
      });
  };
}

export const {} = authSlice.actions;

export default authSlice.reducer;
