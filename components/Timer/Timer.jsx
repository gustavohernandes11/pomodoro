import styles from '../../styles/Timer.module.css'
import React, { useState } from 'react'

import { ReactElement } from 'react'
import { faCog, faRotateRight, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'


export default function Timer() {

    let [isOpenMenu, setIsOpenMenu] = useState(false)
    const [mode, setMode] = useState(null)
    const [foreseenTime, setForeseenTime] = useState(0)
    const [actualMinutes, setActualMinutes] = useState(25)
    const [actualSeconds, setActualSeconds] = useState(60)


    const [breakTime, setBreakTime] = useState(3)
    const [sections, setSections] = useState(3)
    const tick = function () {
        console.log('tick')
        if (actualSeconds > 0) { setActualSeconds(actualSeconds - 1) }
        else if (actualSeconds < 0 && actualMinutes > 0) {
            setActualMinutes(actualMinutes - 1)
            setActualSeconds(actualSeconds - 1)

        }
        else if (actualSeconds < 0 && actualMinutes <= 0) {
            setMode(null)
            console.log('Acabou')
            return
        }
    }

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

    return (
        <>
            <div className={styles.timerContainer}>

                {
                    mode === 'working' ? <button onClick={() => handlePause()} className={styles.whiteButton}><FontAwesomeIcon icon={faPause} /></button> : null
                }{
                    mode === null ? <button onClick={() => handlePlay()} className={styles.playerButton}><FontAwesomeIcon icon={faPlay} /></button> : null
                }{
                    mode === 'paused' ? <button onClick={() => handleContinue()} className={styles.whiteButton}><FontAwesomeIcon icon={faPlay} /></button> : null
                }

                <div className={styles.actualTimeView, 'mt-2 timeview'}>
                    {actualMinutes < 10
                        ? '0' + actualMinutes : actualMinutes}:{(actualSeconds < 10) ? '0' + actualSeconds
                            : actualSeconds}
                </div>
                <p>○○○ ○○○ ○○○</p>

                <span className="flexrow">
                    {
                        mode === 'paused' ?
                            <button onClick={() => handleReset()}><FontAwesomeIcon icon={faRotateRight} /></button> : null

                    }

                </span>
            </div>
            {
                isOpenMenu
                ? (<>
                    <button onClick={() => { setIsOpenMenu(isOpenMenu = !isOpenMenu) }}><FontAwesomeIcon icon={faCog} /></button>
                        <div className="flexrow mt-3">
                            <span className="flexcolumn mr-2">
                                <label htmlFor="sectionsInput">Quantidade de sessões</label>
                                <input className={styles.inputNumber} onChange={e => setSections(e.target.value)} defaultValue="3" min="0" max="5" type="number" name="sections" id="sectionsInput" />
                            </span>
                            <span className="flexcolumn mr-2">
                                <label htmlFor="breakInput">Tempo de descanso</label>
                                <input className={styles.inputNumber} onChange={e => setBreakTime(e.target.value)} defaultValue="5" min="5" max="30" step="5" type="number" name="break" id="breakInput" />
                            </span>
                            <span className="flexcolumn mr-2">
                                <label htmlFor="breakInput">Tempo de atividade</label>
                                <input className={styles.inputNumber} onChange={e => setActualMinutes(e.target.value)} defaultValue="25" min="10" max="60" step="5" type="number" name="break" id="breakInput" />
                            </span>
                        </div>
                    </>)
                    : <button onClick={() => { setIsOpenMenu(isOpenMenu = !isOpenMenu) }}><FontAwesomeIcon icon={faCog} /></button>

            }

        </>
    )
}