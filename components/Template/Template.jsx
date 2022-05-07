import NavBar from './NavBar'
import '../../styles/Template.module.css'
import styles from '../../styles/Template.module.css'


export default function Template(props){
    return (
        <>
        <div className={styles.header}>
            <h1>Pomodoro</h1>
        </div>
        <div className={styles.content}>
            { props.children }
        </div>
        {/* <NavBar/> */}
        </>
    )
}
