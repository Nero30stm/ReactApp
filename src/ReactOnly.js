import './styles/app.scss';
import {useState} from 'react';
import React, { Component } from 'react';

let arrday =
    [
        {
            "name": "Omega",
            "meal": "after",
            "icon": "2",
            "reminders": "20",
            "dose": [
                "8:00",
                "12:00",
            ]
        },
        {
            "name": "D3",
            "meal": "before",
            "icon": "1",
            "reminders": "0",
            "dose": [
                "8:00",
                "12:00",
            ]
        },
    ]

function DropDown(props) {
    const days = ["Sunday", "Monday", "Thursday"];
    const [isDrop, setDrop] = useState(false);
    const [day, setDay] = useState(days[0]);

    let dropDownBox =
        <div className="drop-down-box">
            <span onClick={()=>click_ref.current(days[0])}>{days[0]}</span>
            <span onClick={()=>click_ref.current(days[1])}>{days[1]}</span>
            <span onClick={()=>click_ref.current(days[2])}>{days[2]}</span>
        </div>;

    function changeDrop() {
        setDrop(!isDrop);
    }

    const click_ref = React.useRef(null);

    React.useEffect(()=>{
        function changeDay(day) {
            setDay(day);
            props.fn(day)
        }
        click_ref.current = changeDay;
    },[]);

    if(isDrop) {
        return (
            <div className="date-container">
                <h2 className="day-header">{day}</h2>
                <button class="arrow-up-button" onClick={changeDrop}></button>
                {dropDownBox}
            </div>
        );
    }
    else {
        return (
            <div className="date-container">
                <h2 className="day-header">{day}</h2>
                <button className="arrow-down-button" onClick={changeDrop}></button>
            </div>
        );
    }
}

function TimeBlock(props) {
    return (
        <span>{props.time}</span>
    )
}

function Sunday(props){
    let arr2 ={};
    props.arr.forEach(el => {
        el["dose"].forEach(z =>
            {
                if(!arr2[z]) {
                    arr2[z] = [];
                }
                console.log(z);
                if(z!=undefined) {
                    arr2[z].push(el);
                }
            }
        )
    })
    let u = [];
    console.log(arr2);
    for(let el in arr2) {
        u.push(
            <div>
                <TimeBlock time={el} />
                <TimeBlock time={arr2[el][0]["name"]} />
            </div>
        );
        console.log(arr2[el]["name"]);
    }
    return(
        <div>
            <span>Лекарства на Воскресенье</span>
            {u}
        </div>
    )
}
function Monday(){
    return(
        <div>
            <span>Лекарства на понедельник</span>
        </div>
    )
}
function Thursday(){
    return(
        <div>
            <span>Лекарства на вторник</span>
        </div>
    )
}

function App() {
    const [day, setDay] = useState("Sunday");
    let dayCode;
    switch(day) {
        case "Sunday":
            dayCode = <Sunday arr={arrday}/>;
            break;
        case "Monday":
            dayCode = <Monday />;
            break;
        case "Thursday":
            dayCode = <Thursday />;
            break;
        default:
            break;
    }

    function changeDay(c_day) {
        setDay(c_day);
    }

    return (
        <div className="App content-container">
            <header className="App-header">
                <span>Hey, Sasha!</span>
            </header>
            <div>
                <DropDown fn={changeDay}/>
            </div>
            {dayCode}
        </div>
    );
}

export default App;

