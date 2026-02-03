function changeScore(score: HTMLElement, increment: number) {
    score.innerText = score.innerText + increment
} 
export default function fuelCounter({classes}: {classes?: string}) {
    if (!classes) {
        classes = ""
    }

    let scoreElement;    
    return (
        <table className={`tableNormal ${classes}`}>
          <tbody>
                <tr>
                    <th colSpan={3}>
                        <span className="header">Fuel Count: </span>
                    </th>
                    <th>
                        <span className="header" ref={scoreElement}>0</span>
                    </th>
                </tr>
                <tr>
                    <td>
                        <button className="Jbutton" onClick={() => {changeScore(scoreElement!, -1)}}>-1</button>
                    </td>
                    <td>
                        <button className="Jbutton" onClick={() => {changeScore(scoreElement!, 1)}}>+1</button>
                    </td>
                    <td>
                        <button className="Jbutton" onClick={() => {changeScore(scoreElement!, 5)}}>+5</button>
                    </td>
                    <td>
                        <button className="Jbutton" onClick={() => {changeScore(scoreElement!, 10)}}>+10</button>
                    </td>
                </tr>
          </tbody>
      </table>
    )
}