import React from "react";
import {useState} from 'react';
import {useEffect} from 'react';;

function Pill(props) {
    const [active, setActive] = useState("");
    const [resolved, setResolved] = useState("button");

    let elementTap = () => { //отслеживание нажатия на таблетку чтобы показать/скрыть кропку с галочкой
        if(active.length > 1) {
            setActive("")
        }
        else {
            if (resolved == "button") {
                setActive("active-state")
                console.log("ac")
            }
        }
    }

    let resolvePill = () => { // при нажатии на кнопку с галочкой изменить resolved на true (лекарство принято)
        props.el.dose.forEach((e) => {
                if (e.time == props.doseTime) {
                    e.resolved = true
                }
            }
        )
        elementTap();
    }

    useEffect(() => {
        //поиск задач, которые уже отмеченные как выполненные
        props.el.dose.forEach((e) => {
            if (e.time == props.doseTime) {
                if (e.resolved === true) {
                    setResolved("resolved");
                }
                else {
                    setResolved("button");
                }
            }
        })
    });

    return (
        <div className={"tablet-button-container"}>
            <button className={"button bordered-element tablet-check-button " + active} onClick={resolvePill}/>
            <div className={"bordered-element tablet-container " + resolved} onClick={elementTap}>
                <span className={"pill-img " + props.el.icon}/>
                <div className="pill-text-container">
                    <span className="pill-name">{props.el.name}</span>
                    <span className="not-main-text">{props.el.meal}</span>
                </div>
            </div>
        </div>
    )
}

export default Pill