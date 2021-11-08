import React from "react";
import Pill from "./Pill";

const DayTimeline = (props) =>{

    let timelineValues ={}; // объект в котором свойство - время когда принимаются таблетки, а значение - список этих таблеток
    props.arr.forEach(pill => {
        pill.dose.forEach(doseTime =>
            {
                if(!timelineValues[doseTime.time]) { // если раньше не было таблеток, которые надо принять в это время
                    timelineValues[doseTime.time] = []; // создать свойство с таким временем
                }
                if(doseTime) {
                    timelineValues[doseTime.time].push(pill); //иначе добавить на это время таблетку
                }
            }
        )
    })

    let timelineValuesView = [];
    for(let el in timelineValues) {
        timelineValuesView.push(
            <div className={"timeline-item"}>
                <span >{el}</span>
                <div className={"pills-container"}>
                    {timelineValues[el].map(e => (
                        <Pill el={e} doseTime={el}/>)
                    )}
                </div>
            </div>
        )
    }
    return(
        <div className={"timeline"}>
            {timelineValuesView}
        </div>
    )
}

export default DayTimeline;