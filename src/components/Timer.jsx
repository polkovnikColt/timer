import React, {useState} from 'react';
import {Number} from "./Number";
import "../App.css";
import {useObservable} from "../hooks/useObresvable";
import {main$, stop, start, reset, wait} from "../observers/timerObservable";

export const Timer = () => {

    const [work, setWork] = useState(false);
    const seconds = useObservable(main$);

    const handleStop = () => {
        stop();
        setWork(false);
    }

    const handleStart = () => {
        start();
        setWork(true)
    }

    const handleWait = () => {
        wait();
        setWork(false);
    }

    return (
        <div className="timer">
            <div className="timer-numbers">
                <Number number={Math.floor(seconds / 3600)}/>
                <span>:</span>
                <Number number={Math.floor(seconds % 3600) === 0 ? 0 : Math.floor(seconds / 60 % 60)}/>
                <span>:</span>
                <Number number={seconds % 60}/>
            </div>
            <div className="button-block">
                {/*<button onClick={work ? handleStop : handleStart}>*/}
                {/*    {work ? "Stop" : "Start"}*/}
                {/*</button>*/}
                <button onClick={start}>Start</button>
                <button onClick={stop}>Stop</button>
                <button onClick={handleWait}>
                    Wait
                </button>
                <button onClick={reset}>
                    Reset
                </button>
            </div>
        </div>
    )
}