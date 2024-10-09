import { useState, useRef } from "react";
import ResultModal from './ResultModal';

export default function TimerChallenge({ title, targetTime }) {
    const timeRef = useRef();
    const dialogRef = useRef();

    const [remainingTime, setRemainingTime] = useState(targetTime * 1000);
    const timeIsActive = remainingTime > 0 && remainingTime < targetTime * 1000;

    if(remainingTime <= 0){
        clearInterval(timeRef.current);
        if (dialogRef.current) {
            dialogRef.current.open();
        }
    }
    
    function handleReset(){
        setRemainingTime(targetTime * 1000);
    }

    function handleStart() {
        timeRef.current = setInterval(() => {
            setRemainingTime(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);
    }

    function handleStop() {
        if(dialogRef.current){
            dialogRef.current.open();
        }
        clearInterval(timeRef.current);
    }

    return (
        <>
            <ResultModal ref={dialogRef} targetTimer={targetTime} remainingTime={remainingTime} onReset = {handleReset} />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <button onClick={timeIsActive ? handleStop : handleStart}>
                    {timeIsActive ? 'Stop' : 'Start'} Challenge
                </button>
                <p className={timeIsActive ? 'active' : undefined}>
                    {timeIsActive ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    );
}
