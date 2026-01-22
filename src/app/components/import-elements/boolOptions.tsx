
export default function boolOptions({title, YFunc, NFunc, classes}: {title: string, YFunc: Function, NFunc: Function, classes?: string}) {
    if (!classes) {
        classes = ""
    }
        
    return (
        <table className={`tableNormal ${classes}`}>
          <tbody>
                <tr>
                    <th colSpan={2}>
                        <span className="header">{ title }</span>
                    </th>
                </tr>
                <tr>
                    <td>
                        <input type="radio" name={title} id={`${title}Y`} value="Yes" onClick={() => {
                            YFunc()
                        }}/> <label htmlFor={`${title}Y`}>Yes</label>
                    </td>
                    <td>
                        <input type="radio" name={title} id={`${title}N`} value="No" onClick={() => {
                            NFunc()
                        }}/> <label htmlFor={`${title}N`}>No</label>
                    </td>
                </tr>
          </tbody>
      </table>
    )
}