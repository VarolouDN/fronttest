import { Client } from '../../types'
import styles from './Table.module.css'
import {activeId, updateClient} from "./clientsSlice";
import {useDispatch, useSelector} from "react-redux";
import {memo, useState} from "react";





 function Table(client:Client) {
    const dispatch=useDispatch();
    //const isActive=useSelector(state=>state.clients.isActive)
   const[isActive,setIsActive]=useState(false);
   let [typeName,setTypeName]=useState(client.name);
   let [typeEmail,setTypeEmail]=useState(client.email);
  let [typePhone,setTypePhone]=useState(client.phone);
  const activeId=useSelector(state=>state.clients.activeId)
     const isAuth=useSelector(state=>state.auth.isAuth)
    console.log(client)
    /* name="Victor",
     email='1234@ukr.net'
     phone='222-222-222-222'*/
    function handleSubmit(e){
        e.preventDefault()
       if(!typeName || !typeEmail || !typePhone) return
        dispatch(updateClient(client._id,typeName,typeEmail,typePhone))
      setIsActive(false)
      dispatch({type:'clients/activeId',payload:null})
    }
    function handleActivate(){
      if(activeId && client._id!==activeId) return
       setIsActive(true)
       setTypeName(client.name);
       setTypeEmail(client.email);
       setTypePhone(client.phone)
        dispatch({type:'clients/activeId',payload:client._id})
    }
    return (
        <div>
            {isActive?
                <form className={styles.tr} onSubmit={handleSubmit}>
                    <input onChange={e=>setTypeName(e.target.value)} value={typeName} />
                    <input onChange={e=>setTypeEmail(e.target.value)} value={typeEmail}/>
                    <input onChange={e=>setTypePhone(e.target.value)} value={typePhone}/>
                    <button >Submit</button>
                </form>
        :<div className={styles.table}>
            <div className={styles.tbody}>
            <div className={styles.tr}>
                <div>{client.name}</div>
                <div>{client.email}</div>
                <div>{client.phone}</div>
                {isAuth && <button disabled={activeId && activeId!==client._id} onClick={handleActivate}>Edit data</button>}
            </div>
            </div>
        </div>}
        </div>
    )
}

export default memo(Table)