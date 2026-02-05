import React, { useRef, Ref, ReactElement } from 'react';
function scoreDisplay(ref: Ref<HTMLElement>, score: number, id?: string) {
    if (id) {
        return (
            <span className="header text-4xl" ref={ ref } id={id}>{ score }</span>
        )
    } else {
        return (
            <span className="header text-4xl" ref={ ref }>{ score }</span>
        )
    }
}


export default function fuelCounter({ classes, id, outField }: {classes?: string, id?: string, outField?: boolean}) {
    
    if (!classes) {
        classes = "";
    }
    let title: string;
    if (!outField) {
        title = "Fuel Count: ";
    } else {
        title = "Shot out of field:";
    }
    let scoreElement = useRef(<span /> as unknown as HTMLSpanElement);    
    function changeScore(increment: number) {
        scoreElement.current.textContent = String(Number(scoreElement.current.textContent) + increment);
    } 
    return (
        <table className={`tableNormal ${classes}`}>
          <tbody>
                <tr>
                    <th colSpan={1}>
                        <span className="header">{ title }</span>
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
