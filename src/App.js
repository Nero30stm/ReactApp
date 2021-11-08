import './styles/app.scss';
import React from 'react';
import {observable} from 'mobx';
import { observer } from 'mobx-react';
import DaysPage from './Components/DaysPage/DaysPage';
import AddingPage from './Components/AddingPage/AddingPage';
import addIntervals from './NotificationsCreator'
import PillObj from "./PillCreator";
import {days} from './GlobalVar'

let pagesObj = observable({
    pages: ["DaysPage", "AddingPage"],
    current: "DaysPage",
})

let daysArray = []; // глобальный массив объектов "день недели": "массив таблеток на этот день"

days.forEach(day => {
    daysArray.push({name: day, arr: []})
})

daysArray[0].arr.push( new PillObj("Omega", "1 tablet", "after meal", 1, "20", [
    {time: "8:00", resolved:false},
    {time: "14:00", resolved:false},
]));
daysArray[3].arr.push( new PillObj("Omega", "1 tablet", "after meal", 1, "20", [
    {time: "15:29", resolved:false},
    {time: "15:25", resolved:false},
]));
daysArray[0].arr.push( new PillObj("D3", "10 drops", "after meal ", 2, "20", [
    {time: "8:00", resolved:false},
    {time: "15:00", resolved:false},
    {time: "14:00", resolved:false},
]));
daysArray[1].arr.push( new PillObj("D3", "10 drops", "after meal", 2, "20", [
    {time: "8:00", resolved:false},
    {time: "14:00", resolved:false},
    {time: "15:00", resolved:false},
]));

let daysObj = observable({
    days: days,
    current: days[new Date().getDay()],
})

addIntervals(daysArray, daysObj); // запуск глобального счетчика уведомлений

const App = observer(() => {

    let changePage = (page) => {
        pagesObj.current = page;
    }

    return (
        <div className={""}>
            {pagesObj.current === pagesObj.pages[1]?
                <AddingPage changePage={changePage} pagesObj={pagesObj} daysArray={daysArray} daysObj={daysObj}/>:
                (pagesObj.current === pagesObj.pages[0]?
                    <DaysPage changePage={changePage} daysObj={daysObj} daysArray={daysArray} pagesObj={pagesObj}/>:
                    "404")}
        </div>
    )
})

export default App;

