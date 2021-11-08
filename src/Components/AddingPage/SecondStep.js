import React from "react";
import {days} from './../../GlobalVar'


const SecondStep = (props) => {
    let remindersValuesArray = [5, 10, 15, 20, 30];

    return (
        <div className="second-step">
            <div className="content-container-only-mobile">
                {props.dosesList.map((x, i) => {
                    return (
                        <div className="time-input-container">
                            <span>Dose</span>
                            <input
                                type="time"
                                name="time"
                                placeholder="00:00"
                                value={x.time}
                                onChange={e => props.handleInputChange(e, i)}
                            />
                        </div>
                    )
                })
                }
            </div>
            <div className="content-container-only-mobile">
                <button className="first-btn add-dose" type="button" onClick={props.handleAddClick}/>
            </div>
            <div className="">
                <h2 className="content-container-only-mobile">Reminders</h2>
                <ul className="wide-radio-container no-list">
                    {remindersValuesArray.map((x,i) =>
                        <li className="radio-list-item">
                            <label className="radio-item">
                                <input type="radio" value={x} name="reminders" className="hidden-input" onChange={e => props.reminders.onChange(e)}/>
                                <span className="chip">{x + " m"}</span>
                            </label>
                        </li>
                    )}
                </ul>
            </div>

            <div className="">
                <h2 className="content-container-only-mobile">Day</h2>
                <ul className="wide-radio-container no-list horizontal-scroll-container">
                    {days.map((x, i) =>
                        <li className="radio-list-item">
                            <label className="radio-item">
                                <input type="radio" value={i} name="day" className="hidden-input" onChange={e => props.day.onChange(e)}/>
                                <span className="chip">{x}</span>
                            </label>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default SecondStep