
import {useEffect, useState} from "react";
import Table from "./Table";
import {getClients, isLoading} from "./clientsSlice";

import { useDispatch, useSelector } from "react-redux";
import {State, Client, Clients} from "../../types";
import Loader from "../ui/Loader";



export default function Tables() {

const dispatch=useDispatch()

    const {clients,isLoading}:Clients=useSelector(function(state:State):Clients{
        return state.clients})
useEffect(()=>{

  dispatch(getClients())


},[clients.length])


   console.log(clients)
    console.log(isLoading)
   
    return (
        <div>
          { isLoading ?<Loader/> :  clients.map((client:Client)=><Table key={client._id} {...client} />)}
        </div>
    )
}

