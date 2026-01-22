import React from 'react';

export default function Slider({title, min, max, defaultVal, classes}: {title: string, min: number, max: number, defaultVal:number, classes?: string}) {
    let titleElement = React.useRef<HTMLDivElement>(null);
    let slider = React.useRef<HTMLInputElement>(null);
    if (!classes) {
        classes = ""
    }
    
    return (
        <table className={`tableNormal ${classes}`}>
            <tbody>
                <tr>
                    <th colSpan={2}>
                        <span className="header" ref={titleElement} id={`${title}`}>{ defaultVal }</span>
                    </th>
                </tr>
                <tr>
                    <td>
                        <input ref={slider} type="range" min={min} max={max} defaultValue={defaultVal} className="slider" id="test" onChange={() => {
                            titleElement.current!.textContent = slider.current!.value;
                        }} />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}