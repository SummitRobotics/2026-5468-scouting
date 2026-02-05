export default function multiOptions({title, options, classes}: {title: string, options: Array<Record<string, string | number>>, classes?: string}) {
    if (!classes) {
        classes = ""
    }
    const optionsElements = options.map((val) => (
        <><input type="radio" name={title} id={`${title}${val.return}`} value={val.return} /> <label htmlFor={`${title}${val.return}`}>{val.option}</label></>
    ));
        
    return (
        <table className={`tableNormal ${classes}`}>
          <tbody>
                <tr>
                    <th colSpan={2}>
                        <span className="header">{ title }</span>
                    </th>
                </tr>
                <tr>
                    { optionsElements }
                </tr>
          </tbody>
      </table>
    )
}