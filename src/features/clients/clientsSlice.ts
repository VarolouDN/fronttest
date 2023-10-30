import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client, ClientsState } from "../../types";
import { Dispatch } from "redux";
import { AnyAction } from "@reduxjs/toolkit";

const initialState: ClientsState = {
  clients: [],
  isLoading: false,
  activeId: null,
};
const host = "https://backtest-omega.vercel.app";
//const host = "http://localhost:5000";

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    getClients(state, action: PayloadAction<Client[]>): any {
      state.clients = action.payload;
    },
    updateClient: {
      prepare(_id, name, email, phone, id, username): { payload: Client } {
        return {
          payload: { _id, name, email, phone, id, username },
        };
      },
      reducer(state, action: PayloadAction<Client>): any {
        state.clients = state.clients.map(function (elem: Client) {
          console.log(action.payload);
          if (action.payload._id === elem._id) {
            console.log(action.payload._id === elem._id);
            return {
              _id: action.payload._id,
              id: action.payload.id,
              name: action.payload.name,
              email: action.payload.email,
              phone: action.payload.phone,
              username: action.payload.username,
            };
          } else {
            //   console.log(elem)
            return elem;
          }
        });
      },
    },

    isLoading(state, action) {
      state.isLoading = action.payload;
    },
    activeId(state, action) {
      state.activeId = action.payload;
    },
  },
});

export function getClients(): any {
  return function (dispatch: any): void {
    dispatch({ type: "clients/isLoading", payload: true });
    fetch(`${host}/api/clients`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);

        dispatch({ type: "clients/getClients", payload: data });
      })
      .catch((error) => {
        console.log(error);

        alert(error.message);
      })
      .finally(() => {
        dispatch({ type: "clients/isLoading", payload: false });
      });
  };
}
export function updateClient(
  _id: string,
  name: string,
  email: string,
  phone: string,
  id: number,
  username: string
): any {
  console.log(id, name, email, phone);
  return function (dispatch: Dispatch<AnyAction>) {
    dispatch({ type: "clients/isLoading", payload: true });
    fetch(`${host}/api/clients/${_id}`, {
      method: "put",
      body: JSON.stringify({ name, email, phone, id, username }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.client);

        dispatch({ type: "clients/updateClient", payload: data.client });
      })
      .catch((error) => {
        console.log(error);

        alert(error.message);
      })
      .finally(() => {
        dispatch({ type: "clients/isLoading", payload: false });
      });
  };
}
export const { isLoading, activeId } = clientsSlice.actions;

export default clientsSlice.reducer;
