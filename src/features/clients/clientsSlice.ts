import { createSlice } from "@reduxjs/toolkit";
import { Client } from "../../types";

const initialState = {
  clients:[],
  isLoading:false


};

const host = "http://localhost:5000";

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    getClients(state, action) {
      state.clients = action.payload;

    },
    isLoading(state,action){
      state.isLoading=action.payload
    }

  },
});

export function getClients() {
  return function (dispatch: any) {
      dispatch({type:'clients/isLoading',payload:true})
    fetch(`${host}/api/clients`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);

        dispatch({ type: "clients/getClients", payload: data });
      })
      .catch((error) => {
        console.log(error);

        alert(error.message);
      }).finally(()=>{
        dispatch({type:'clients/isLoading',payload:false})
    })
  };
}

export const {isLoading} = clientsSlice.actions;

export default clientsSlice.reducer;
