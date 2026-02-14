interface optionAttrs {
    value: string | number,
    label: string,
    name?: string,
};

interface inputOptions {
    title: string,
    options: optionAttrs[],
    classes?: string,
    id?: string,
    name?: string,
    vertical?: boolean,
    multiSelect?: boolean,
};

export default function multiOptions({title, options, classes, id, name, vertical, multiSelect}: inputOptions) {
    if (!classes) {
        classes = "";
    }
    const inputType: string = (multiSelect) ? "checkbox" : "radio";

    return (
        <div id={ id } className="border-t-1 border-gray-400/30 py-4">
            <h3 className="text-center text-lg">{ title }</h3>

            <div className={`grid ${vertical ? 'grid-cols-1' : 'grid-cols-3 place-items-center'} gap-4 pt-4 ${classes}`}>
                { options.map((option, index) => {
                    const optionID = `${name}_${option.value}`;
                    const optionName = (multiSelect && option.name) ? option.name : name;

                    return (
                        <div key={index} className="flex place-items-center">
                            <input type={ inputType } className="mr-4 shrink-0" name={optionName} id={optionID} value={option.value} /> <label htmlFor={optionID}>{option.label}</label>
                        </div>
                    )}
                ) }
            </div>
        </div>
    );
}
