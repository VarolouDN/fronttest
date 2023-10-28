import {useNavigation,Outlet} from 'react-router-dom'
import Loader from "./Loader";
import {useEffect} from "react";
import styles from "./AppLayout.module.css"


export default function AppLayout() {
    const navigation=useNavigation()
    const isNavLoading=navigation.state==='loading'
    console.log(navigation)

    return (
        <div className={styles.container}>
            {isNavLoading && <Loader/>}
            <main>
            <Outlet/>
            </main>
        </div>
    )
}