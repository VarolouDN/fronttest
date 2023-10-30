

import Table from "./Table";


import { useSelector } from "react-redux";
import {State, Client, ClientsState} from "../../types";
import Loader from "../ui/Loader";



export default function Tables({currentClients}:any) {

    const {isLoading}:any=useSelector(function(state:State):ClientsState{
        return state.clients})
        console.log(isLoading)
/*const dispatch=useDispatch()

    const {clients,isLoading}:Clients=useSelector(function(state:State):Clients{
        return state.clients})
useEffect(()=>{

  dispatch(getClients())


},[clients.length])


   console.log(clients)
    console.log(isLoading)*/
   
    return (
        <div>
          { isLoading ?<Loader/> :  currentClients.map((client:Client)=><Table key={client._id} {...client} />)}
        </div>
    )
}

