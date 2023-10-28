import {MutableRefObject, useEffect, useRef, useState} from "react";
import styles from "./Auth.module.css"
import {login} from "./authSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom'




const USER_REGEX = /^[A-z][A-z0-9-_]{6,14}$/;
const PASSWORD_REGEX = /^[A-z][A-z0-9-_]{6,14}$/;

export default function Login(){
    const userRef:MutableRefObject<any>=useRef()

    const[userName,setUserName]=useState('')
    const [validName,setValidName]=useState(false)
    const [userFocus,setUserFocus]=useState(false)



    const[password,setPassword]=useState('')
    const[validPassword,setValidPassword]=useState(false)
    const [passwordFocus,setPasswordFocus]=useState(false)


    const[errorMessage,setErrorMessage]=useState('')


    const dispatch=useDispatch()
    const navigate=useNavigate()

    useEffect(()=>{
        console.log(userRef.current)
        userRef.current.focus()
    },[])



    useEffect(()=>{
        const result=USER_REGEX.test(userName)
        console.log(result)
        console.log(userName)
        setValidName(result)
    },[userName])
    useEffect(()=>{
        const result=PASSWORD_REGEX.test(password)
        console.log(result)
        console.log(password)
        setValidPassword(result)
    },[password])

    function handleSubmit(e){
        e.preventDefault()
        const v1 = USER_REGEX.test(userName);
        const v2 = PASSWORD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrorMessage("Invalid Input");
            return;
        }
    else {
            dispatch(login(userName, password, navigate))

            setUserName('')
            setPassword('')
        }

    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor='userName'>
                <em>Enter Username</em>
            </label>
            <input value={userName} id='userName' onChange={e=>setUserName(e.target.value)} type="text"
                   ref={userRef}
                   onFocus={() => setUserFocus(true)}
                   onBlur={() => setUserFocus(false)}/>
            <p /* id="uidnote"*/ className={/*userFocus &&*/ userName && !validName ? `${styles.instructions}` : `${styles.offscreen}`}>

                6 to 14 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores allowed.
            </p>
            <label htmlFor='password'>
                <em>Enter Password</em>
            </label>
            <input value={password} id='password' onChange={e=>setPassword(e.target.value)} type="password"
                   onFocus={() => setPasswordFocus(true)}
                   onBlur={() => setPasswordFocus(false)}
            />
            <p /*id="pwdnote" */className={ /*passwordFocus &&*/ password && !validPassword ? `${styles.instructions}` : `${styles.offscreen}`}>

                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>
            <button className={styles.btn} type="submit" value="Submit" disabled={!validName || !validPassword}>
                <em>Submit</em>
            </button>
        </form>
    );

}