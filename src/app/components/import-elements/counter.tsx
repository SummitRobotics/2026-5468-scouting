import { title } from 'process';
import { useRef, Ref } from 'react';
function scoreDisplay(ref: Ref<HTMLInputElement>, score: number, id?: string, name?: string) {
    return (
        <input type="number" min="0" ref={ ref } name={name} id={id || ""} defaultValue={score} />
    )
}


export default function fuelCounter({ classes, id, name}: {classes?: string, id?: string, name?: string}) {

    if (!classes) {
        classes = "";
    }
    const scoreElement = useRef(<span /> as unknown as HTMLInputElement);
    function changeScore(increment: number) {
        if (increment < 0 && scoreElement.current.value === "0") {
            return;
        }
        scoreElement.current.value = String(Number(scoreElement.current.value) + increment);
    }
    return (
        <div id={ id } className="counter border-t-1 border-gray-400/30 py-4">
            <h3 className="text-center text-lg">Fuel Count</h3>

            <div className="flex justify-center">
                {scoreDisplay(scoreElement,0, id, name)}
            </div>

            <div className="grid grid-cols-2 gap-4 justify-items-center">
                <button onClick={() => {changeScore(-1)}}>-1</button>
                <button onClick={() => {changeScore(1)}}>+1</button>
                <button onClick={() => {changeScore(10)}}>+10</button>
                <button onClick={() => {changeScore(5)}}>+5</button>
            </div>
        </div>
    )
}
