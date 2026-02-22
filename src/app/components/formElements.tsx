import React, { useState } from 'react';

interface optionAttrs {
    value: string | number,
    label: string,
    name?: string,
    selected?: boolean
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

export function MultiOptions({title, options, classes, id, name, vertical, multiSelect}: inputOptions) {
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
                    const selected = !!option.selected;

                    return (
                        <div key={index} className="flex place-items-center">
                            <input type={ inputType } defaultChecked={selected} className="mr-4 shrink-0" name={name} id={optionID} value={option.value} /> <label htmlFor={optionID}>{option.label}</label>
                        </div>
                    )}
                ) }
            </div>
        </div>
    );
}

export function BoolOptions({title, name, YFunc, NFunc, classes, id, defaultValue}: {title: string, YFunc?: Function, NFunc?: Function, classes?: string, id?: string, name: string, defaultValue?: boolean}) {
    if (!classes) {
        classes = "";
    }

    return (
        <div id={ id } className="border-t-1 border-gray-400/30 py-4">
            <h3 className="text-center text-lg">{ title }</h3>
            <div className="grid grid-cols-2 gap-4 pt-4 place-items-center">
                <div className="flex place-items-center">
                    <input type="radio" defaultChecked={defaultValue === true} className="mr-4 shrink-0" name={name} id={`${title}Y`} value="true" onClick={() => {
                        if (YFunc) {
                            YFunc()
                        }
                    }}/> <label htmlFor={`${title}Y`}>Yes</label>
                </div>
                <div className="flex place-items-center">
                     <input type="radio" defaultChecked={!defaultValue} className="mr-4 shrink-0" name={name} id={`${title}N`} value="false" onClick={() => {
                         if (NFunc) {
                             NFunc()
                         }
                     }}/> <label htmlFor={`${title}N`}>No</label>
                </div>

            </div>
        </div>
    )
}

export function FuelCounter({ name }: {name: string}) {
    const [score, setScore] = useState<number>(0);

    const handleUpdateScore = (value: number) => {
        if(score + value < 0) {
            setScore(0);
            return;
        }
        setScore(score + value);
    }

    return (
       <div className="counter border-t-1 border-gray-400/30 py-4">
            <h3 className="text-center text-lg">Fuel Count</h3>
            <div className="flex justify-center">
                <input type="number" min="0" name={name} value={score} onChange={(e) => handleUpdateScore(Number(e.target.value) - score)} />
            </div>

            <div className="grid grid-cols-2 gap-4 justify-items-center">
                <button type="button" onClick={() => {handleUpdateScore(-1)}}>-1</button>
                <button type="button" onClick={() => {handleUpdateScore(1)}}>+1</button>
                <button type="button" onClick={() => {handleUpdateScore(10)}}>+10</button>
                <button type="button" onClick={() => {handleUpdateScore(5)}}>+5</button>
            </div>
       </div>
    )
}


// export function Slider({title, min, max, defaultVal, classes}: {title: string, min: number, max: number, defaultVal:number, classes?: string}) {
//     let titleElement = React.useRef<HTMLDivElement>(null);
//     let slider = React.useRef<HTMLInputElement>(null);
//     if (!classes) {
//         classes = ""
//     }

//     return (
//         <table className={`tableNormal ${classes}`}>
//             <tbody>
//                 <tr>
//                     <th colSpan={2}>
//                         <span className="header" ref={titleElement} id={`${title}`}>{ defaultVal }</span>
//                     </th>
//                 </tr>
//                 <tr>
//                     <td>
//                         <input ref={slider} type="range" min={min} max={max} defaultValue={defaultVal} className="slider" id="test" onChange={() => {
//                             titleElement.current!.textContent = slider.current!.value;
//                         }} />
//                     </td>
//                 </tr>
//             </tbody>
//         </table>
//     )
// }
