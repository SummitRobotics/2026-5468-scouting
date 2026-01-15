
export default function boolOptions({title, id}: {title: string, id: string}) {
    return (
        <table className="tableNormal">
          <tbody>
                <tr>
                          <th colSpan={2}>
                                          <span className="header">{ title }</span>
                          </th>
                </tr>
                <tr>
                          <td>
                                          <input type="radio" name="field" id="fieldY" value="Yes"/> <label htmlFor="fieldY">Yes</label>
                          </td>
                          <td>
                                          <input type="radio" name="field" id="fieldN" value="No" /> <label htmlFor="fieldN">No</label>
                          </td>
                </tr>
          </tbody>
      </table>
    )
}