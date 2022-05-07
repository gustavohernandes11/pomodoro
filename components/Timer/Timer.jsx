import styles from '../../styles/Timer.module.css'
import React, { useState } from 'react'



export default function Timer() {

    let [isOpenMenu, setIsOpenMenu] = useState(false)
    const [mode, setMode] = useState(null)
    const [foreseenTime, setForeseenTime] = useState('00')
    const [actualMinutes, setActualMinutes] = useState(25)
    const [actualSeconds, setActualSeconds] = useState(60)


    const [breakTime, setBreakTime] = useState(3)
    const [sections, setSections] = useState(3)

    function handlePlay() {
        setForeseenTime((Date.now() + actualMinutes * 60 * 1000))
        // console.log(foreseenTime - Date.now())
        setMode('working')
        window.setInterval(tick, 1000)
    }
    function handlePause() {
        setMode('paused')
        clearInterval(tick)
        console.log('f: ' + foreseenTime)
        console.log('n: ' + Date.now())



    }
    function handleReset() {
        setMode(null)
    }
    function handleContinue() {
        setMode('working')

    }
    const tick = function() {
        if (actualSeconds > 0) { setActualSeconds(actualSeconds-1) }
        else if (actualSeconds <= 0 && actualMinutes > 0) {
            setActualMinutes(actualMinutes - 1)
            setActualSeconds(actualSeconds - 1)
        
        }
        else if (actualSeconds <= 0 && actualMinutes <= 0) {
            setMode(null)
            console.log('Acabou')
            return
        }
    }

    return (
        <>
            <div className={styles.timerContainer}>
                {
                    mode === 'working' ? <button onClick={() => handlePause()} className={styles.pauseButton}>Pause</button> : null
                }{
                    mode === null ? <button onClick={() => handlePlay()} className={styles.playerButton}>Go</button> : null
                }{
                    mode === 'paused' ? <button onClick={() => handleContinue()} className={styles.playerButton}>Continuar</button> : null
                }

                <p className={styles.actualTimeView}>
                    {actualMinutes < 10
                        ? '0' + actualMinutes : actualMinutes}:{actualSeconds < 10 ? '0' + actualSeconds
                            : actualSeconds}
                </p>
                <p>○○○ ○○○ ○○○</p>

                <span className="flexrow">
                    {
                        mode === 'paused' ?
                            <button onClick={() => handleReset()}>Resetar</button> : null

                    }
                    <button onClick={() => { setIsOpenMenu(isOpenMenu = !isOpenMenu) }}>Config</button>
                </span>
            </div>
            {
                isOpenMenu
                    ? (<><div className="flexrow mt-2">
                        <span className="flexcolumn mr-2">
                            <label htmlFor="sectionsInput">Quantidade de sessões</label>
                            <input className={styles.inputNumber} onChange={e => setSections(e.target.value)} defaultValue="3" min="0" max="5" type="number" name="sections" id="sectionsInput" />
                        </span>
                        <span className="flexcolumn mr-2">
                            <label htmlFor="breakInput">Tempo de descanso</label>
                            <input className={styles.inputNumber} onChange={e => setBreakTime(e.target.value)} defaultValue="5" min="0" max="30" step="5" type="number" name="break" id="breakInput" />
                        </span>
                        <span className="flexcolumn mr-2">
                            <label htmlFor="breakInput">Tempo de atividade</label>
                            <input className={styles.inputNumber} onChange={e => setActualMinutes(e.target.value)} defaultValue="25" min="0" max="60" step="5" type="number" name="break" id="breakInput" />
                        </span>
                    </div>
                        <button onClick={() => { setIsOpenMenu(isOpenMenu = !isOpenMenu) }}>Config</button>
                    </>)
                    : null
            }

        </>
    )
}