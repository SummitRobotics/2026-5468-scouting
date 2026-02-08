import { useRef, Ref } from 'react';
function scoreDisplay(ref: Ref<HTMLInputElement>, score: number, id?: string) {
    if (id) {
        return (
            <input className="textInput" ref={ ref } id={id} defaultValue={score} style={{}} />
        )
    } else {
        return (
            <input className="textInput" ref={ ref } defaultValue={score} style={{}} />
        )
    }
}


export default function fuelCounter({ classes, id}: {classes?: string, id?: string, outField?: boolean}) {
    
    if (!classes) {
        classes = "";
    }
    let scoreElement = useRef(<span /> as unknown as HTMLInputElement);    
    function changeScore(increment: number) {
        scoreElement.current.value = String(Number(scoreElement.current.value) + increment);
    } 
    return (
        <table className={`tableNormal ${classes}`} id={ id }>
          <tbody>
                <tr>
                    <th colSpan={1} className="w-[50%]">
                        <span className="header">Fuel Count:</span>
                    </th>
                    <th>
                        {scoreDisplay(scoreElement,0)}
                    </th>
                </tr>
                <tr>
                    <td>
                        <button className="Jbutton" onClick={() => {changeScore(-1)}}>-1</button>
                    </td>
                    <td>
                        <button className="Jbutton" onClick={() => {changeScore(1)}}>+1</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button className="Jbutton" onClick={() => {changeScore(5)}}>+5</button>
                    </td>
                    <td>
                        <button className="Jbutton" onClick={() => {changeScore(10)}}>+10</button>
                    </td>
                </tr>
          </tbody>
      </table>
    )
}
