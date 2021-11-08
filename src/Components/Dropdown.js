import {observer} from "mobx-react";
import React, {useState} from "react";
import {action} from "mobx";

let DropDown = (
    (props) => {
        const [isDrop, setDrop] = useState(false);

        let changeDrop = () => {
            setDrop(!isDrop);
        }

        let changeDay = action((day) => {
            props.daysObj.current = day;
            changeDrop();
        })

        let dropDownBox =
            <div className="drop-down-box">
                {props.daysObj.days.map(e => (
                    <span onClick={()=>{changeDay(e)}}>{e}</span>
                ))}

            </div>;

        return (
            <div className="date-container">
                <h2 className="day-header" onClick={changeDrop}>{props.daysObj.current}</h2>
                <button className={isDrop?"arrow-down-button":"arrow-up-button"} onClick={changeDrop}></button>
                {isDrop?( dropDownBox):null}
            </div>
        );
    }
)

export default DropDown;