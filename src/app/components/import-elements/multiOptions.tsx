export default function multiOptions({title, options, classes, id, vertical, multiSelect}: {title: string, options: Array<Record<string, string | number>>, classes?: string, id?: string, name?: string, vertical?: boolean, multiSelect?: boolean}) {
    if (!classes) {
        classes = "";
    }
    const inputType: string = (multiSelect) ? "checkbox" : "radio";
    if (vertical) {
        const optionsElements = options.map((val, index) => (
            <div key={index} className="flex place-items-center py-2">
                <input type={ inputType } className="mr-4 shrink-0" name={`${val.name}`} id={`${title}${val.return}`} value={val.return} /> <label htmlFor={`${title}${val.return}`}>{val.option}</label>
            </div>
        ));
        return (
            <div id={ id } className="border-t-1 border-gray-400/30 py-4">
                <h3 className="text-center text-lg">{ title }</h3>

                <div>
                    { optionsElements }
                </div>
            </div>
        )
    } else {
        const optionsElements = options.map((val, index) => (
            <div key={index} className="flex place-center"><input type={ inputType } className="mr-4" name={`${val.name}`} id={`${title}${val.return}`} value={val.return} /> <label htmlFor={`${title}${val.return}`}>{val.option}</label></div>
        ));
        return (

            <div id={ id } className="border-t-1 border-gray-400/30 py-4">
                <h3 className="text-center text-lg">{ title }</h3>

                <div className="grid grid-cols-3 gap-4 pt-4">
                    { optionsElements }
                </div>

            </div>
        )
    }
}
