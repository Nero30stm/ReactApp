import React from "react";

const FirstStep = (props) => {
    let mealValuesArray = ["Nevermind", "Before meals", "After meals", "With food"]

    return (
    <div>
        <div className="pill-type-container content-container-only-mobile no-list">
            {[...Array(4)].map((x, i) =>
                <label className="pill-type-item">
                    <input type="radio" value={i+1} name="pill-type" className="hidden-input" onClick={e => props.icon.onChange(e)}/>
                    <span className={"pill-item pill-"+(i+1)}/>
                    <span className="pill-check"/>
                </label>
            )}
        </div>
        <div className="content-container-only-mobile inputs-container">
            <input type="text" className="input"  value={props.name.value} onChange={e => props.name.onChange(e)} placeholder="Name" />
            <input type="text" className="input"  value={props.dose_value.value} onChange={e => props.dose_value.onChange(e)}  placeholder="Single dose, e.g. 1 tablet" />
        </div>

        <ul className="no-list wide-radio-container horizontal-scroll-container">
            {mealValuesArray.map((x,i) =>
                <li className="radio-list-item">
                    <label className="radio-item">
                        <input type="radio" value={x} name="meal" className="hidden-input" onChange={e => props.meal.onChange(e)}/>
                        <span className="chip">{x}</span>
                    </label>
                </li>
            )}
        </ul>
    </div>
    )
}

export default FirstStep;