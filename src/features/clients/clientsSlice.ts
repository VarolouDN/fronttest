import { createSlice } from "@reduxjs/toolkit";
import { Client } from "../../types";

const initialState = {
  clients:[],
  isLoading:false,
  activeId:null





};
const host="https://backtest-steel.vercel.app"
//const host = "http://localhost:5000";

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    getClients(state, action) {
      state.clients = action.payload;

    },
    updateClient: {
      prepare(_id, name, email, phone) {
        return {
          payload: {_id, name, email, phone}
        }
      },
      reducer(state, action) {

        state.clients = state.clients.map(function (elem) {
            console.log(action.payload)
              if (action.payload._id === elem._id) {
                console.log(action.payload._id === elem._id)
                return ({
                  _id: action.payload._id,
                  id: action.payload.id,
                  name: action.payload.name,
                  email: action.payload.email,
                  phone: action.payload.phone


                })
              } else{
             //   console.log(elem)
                return elem
              }
            }
        )

      }
    },

    isLoading(state,action){
      state.isLoading=action.payload
    },
    activeId(state,action){
      state.activeId=action.payload
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
export function updateClient(id,name,email,phone) {
  console.log(id,name,email,phone)
  return function (dispatch: any) {
    dispatch({type:'clients/isLoading',payload:true})
    fetch(`${host}/api/clients/${id}`,{
      method:'put',
      body:JSON.stringify({name,email,phone}),
      headers: {
        "content-type": "application/json"
      }
    })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data.client);

          dispatch({ type: "clients/updateClient", payload:data.client});
        })
        .catch((error) => {
          console.log(error);

          alert(error.message);
        }).finally(()=>{
      dispatch({type:'clients/isLoading',payload:false})
    })
  };
}
export const {isLoading,activeId} = clientsSlice.actions;

export default clientsSlice.reducer;
