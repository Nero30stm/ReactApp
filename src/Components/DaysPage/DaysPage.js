import {observer} from "mobx-react";
import React from 'react';
import {mobileScreen} from "../../GlobalVar";
import DayTimeline from "./DayTimeline";
import DropDown from "../Dropdown";
import {action} from "mobx";


const DaysPage = observer((props) => {
        let dayCode = "";
        if (mobileScreen) { // если пользователь зашел со смартфона
            let dayObj = props.daysArray.find(el => el.name == props.daysObj.current); // найти в списке лекарства на текущий день
            if (dayObj) {
                dayCode = (
                    <DayTimeline arr={dayObj.arr}/>
                )
            }
        }
        else { //если пользователь зашел не через смартфон
            dayCode = [];
            props.daysArray.forEach((e) => { //обход всех дней недели
                if(e.arr.length > 0) // если на этот день недели создана хоть одна задача приема лекарства
                    dayCode.push( //вывести этот день недели и лекарства на этот день
                        <div>
                            <span className="h1">{e.name}</span>
                            <DayTimeline arr={e.arr}/>
                        </div>
                    )
                }
            )
        }

        return (
            <div className="App content-container">
                <header className="App-header">
                    <span className="not-main-text">Hey, Sasha!</span>
                </header>
                <div>
                    {mobileScreen ?
                        <DropDown daysObj={props.daysObj}/>: ""
                    }
                </div>
                {dayCode}
                <button className={"button first-btn add-pill"} onClick={action(() => props.changePage(props.pagesObj.pages[1]))}></button>
            </div>
        );
    }
)

export default DaysPage;