import Link from 'next/link'
import styles from '../../styles/Template.module.css'

export default function NavBar(){
    return (
        <div className={styles.navbar}>
        <Link href="/">Home</Link>
        <Link href="/config">Config</Link>
        </div>
    )
}