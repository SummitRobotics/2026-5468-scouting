export default function multiOptions({title, options, classes, id, vertical, multiSelect}: {title: string, options: Array<Record<string, string | number>>, classes?: string, id?: string, name?: string, vertical?: boolean, multiSelect?: boolean}) {
    if (!classes) {
        classes = "";
    }
    const inputType: string = (multiSelect) ? "checkbox" : "radio";
    if (vertical) {
        const optionsElements = options.map((val, index) => (
            <tr key={index}><td><input type={ inputType } name={val.name} id={`${title}${val.return}`} value={val.return} /> <label htmlFor={`${title}${val.return}`}>{val.option}</label></td></tr>
        ));
        return (
            <table className={`tableNormal ${classes}`} id={ id }>
                <tbody>
                        <tr>
                            <th colSpan={options.length}>
                                <span className="header">{ title }</span>
                            </th>
                        </tr>
                        { optionsElements }
                </tbody>
            </table>
        )
    } else {
        const optionsElements = options.map((val, index) => (
            <td key={index}><input type={ inputType } name={val.name} id={`${title}${val.return}`} value={val.return} /> <label htmlFor={`${title}${val.return}`}>{val.option}</label></td>
        ));
        return (
            <table className={`tableNormal ${classes}`} id={ id }>
                <tbody>
                        <tr>
                            <th colSpan={options.length}>
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
}
