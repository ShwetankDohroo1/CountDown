import { forwardRef, useImperativeHandle, useRef } from "react";
import {createPortal} from 'react-dom';

const ResultModal = forwardRef(function ResultModal({ onReset, targetTimer, remainingTime }, ref) {

    const dialogRef = useRef();

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime/1000).toFixed(2);
    const score = Math.round((1- remainingTime / (targetTimer*1000)) * 100);

    useImperativeHandle(ref, () => ({
        open() {
            if (dialogRef.current) {
                dialogRef.current.showModal();
            }
        },
        close() {
            if (dialogRef.current) {
                dialogRef.current.close();
            }
        }
    }));

    return createPortal(
        <dialog ref={dialogRef} className="result-modal">
            {userLost && <h2>You Lost</h2>}
            {!userLost && <h2>Your Score : {score}</h2>}
            <p>The Target Time was <strong>{targetTimer} seconds.</strong></p>
            <p>You Stopped the Timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
});

export default ResultModal;
