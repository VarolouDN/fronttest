import { Client } from '../../types'
import styles from './Table.module.css'





export default function Table({email,id,name,phone,username,_id}:Client) {
    console.log(id)
    return (
        <div className={styles.table}>


            <div className={styles.tbody}>
            <div className={styles.tr}>
                <div>{name}</div>
                <div>{email}</div>
                <div>{phone}</div>
                <button >Edit data</button>
            </div>
            </div>
        </div>
    )
}