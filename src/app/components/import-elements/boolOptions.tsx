
export default function boolOptions({title, name, YFunc, NFunc, classes, id}: {title: string, YFunc?: Function, NFunc?: Function, classes?: string, id?: string, name: string}) {
    if (!classes) {
        classes = "";
    }

    return (
        <div id={ id } className="border-t-1 border-gray-400/30 py-4">
            <h3 className="text-center text-lg">{ title }</h3>
            <div className="grid grid-cols-2 gap-4 pt-4 place-items-center">
                <div className="flex place-items-center">
                    <input type="radio" className="mr-4 shrink-0" name={name} id={`${title}Y`} value="Yes" onClick={() => {
                        if (YFunc) {
                            YFunc()
                        }
                    }}/> <label htmlFor={`${title}Y`}>Yes</label>
                </div>
                <div className="flex place-items-center">
                     <input type="radio" className="mr-4 shrink-0" name={name} id={`${title}N`} value="No" onClick={() => {
                         if (NFunc) {
                             NFunc()
                         }
                     }}/> <label htmlFor={`${title}N`}>No</label>
                </div>

            </div>
        </div>
    )
}
