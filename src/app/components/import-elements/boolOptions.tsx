
export default function boolOptions({title, name, YFunc, NFunc, classes, id}: {title: string, YFunc?: Function, NFunc?: Function, classes?: string, id?: string, name: string}) {
    if (!classes) {
        classes = "";
    }

    return (
        <table className={`tableNormal ${classes}`} id={ id }>
          <tbody>
                <tr>
                    <th colSpan={2}>
                        <span className="header">{ title }</span>
                    </th>
                </tr>
                <tr>
                    <td>
                        <input type="radio" name={name} id={`${title}Y`} value="Yes" onClick={() => {
                            if (YFunc) {
                                YFunc()
                            }
                        }}/> <label htmlFor={`${title}Y`}>Yes</label>
                    </td>
                    <td>
                        <input type="radio" name={name} id={`${title}N`} value="No" onClick={() => {
                            if (NFunc) {
                                NFunc()
                            }
                        }}/> <label htmlFor={`${title}N`}>No</label>
                    </td>
                </tr>
          </tbody>
      </table>
    )
}
