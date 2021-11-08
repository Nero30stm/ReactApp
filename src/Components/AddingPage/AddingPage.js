import {observer} from "mobx-react";
import useInput from "../CustomHooks";
import {action} from "mobx";
import {useState} from 'react';
import React from 'react';
import PillObj from "./../../PillCreator";
import addIntervals from './../../NotificationsCreator'
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import {mobileScreen} from "../../GlobalVar";

const AddingPage = observer((props) => {

    const [currentStep, setCurrentStep] = useState(0); //шаг добавления элемента

    let name = useInput(""),
        dose_value = useInput(""),
        meal = useInput(""),
        icon = useInput(""),
        reminders = useInput(""),
        day = useInput("");

    const [dosesList, setDosesList] = ( useState( //список времен приема таблетки (изначально одно время - 00:00)
        [
            {time: "00:00", resolved:false}
        ]
    ));

    const secondButton = React.useRef(null);
    const firstButton = React.useRef(null);

    React.useEffect(()=> {

        let createPill = (name, dose_value, meal, icon, reminders, dose, day) => { //функция создания таблетки по введенным в инпуты значениям
            props.daysArray[day.value].arr.push(new PillObj(name.value, dose_value.value, meal.value, icon.value, reminders.value, dose));
            if(props.daysObj.days[day.value] == props.daysObj.current) //если мы добавили таблетку на текущий день, нужно пересчитать интервалы напоминаний
            {
                addIntervals(props.daysArray, props.daysObj);
            }
            props.changePage(props.pagesObj.pages[0]); //вернуться на страницу со списком таблеток
        }

        let changeStep = (page) => { //функция перехода между шагами на форме
            setCurrentStep(page)
        }

        firstButton.current = changeStep;
        secondButton.current = createPill;
    }, [])


    const handleInputChange = (e, index) => { //функция изменения времени приема таблетки
        const list = [...dosesList];
        list[index].time = e.target.value;
        setDosesList(list);
    };

    const handleRemoveClick = index => { //функция удаления времени приема таблетки
        const list = [...dosesList];
        list.splice(index, 1);
        setDosesList(list);
    };

    const handleAddClick = () => { //функция добпвления времени приема таблетки
        setDosesList([...dosesList, { time: "00:00", resolved:false}]);
    };

    let pageValues = [ // объект содержит данные которые отображаются на конкретном шаге
        {
            h2: "Add medication",
            //функция вызываемая при клике на кнопку, если пользователь на 1 шаге
            func: () => firstButton.current(1),
            //Условие активации кнопки, если пользователь на 1 шаге
            formValid: (name.isEmpty || icon.isEmpty || dose_value.isEmpty || meal.isEmpty),
            //Текст активной кнопки, если пользователь на 2 шаге
            buttonActive: "Next",
            //html шаблон
            template: <FirstStep name={name} dose_value={dose_value} icon={icon} meal={meal}/>,
        },
        {
            h2: "Schedule",
            //функция вызываемая при клике на кнопку, если пользователь на 2 шаге
            func: () => secondButton.current(name, dose_value, meal, icon, reminders, dosesList, day),
            //Условие активации кнопки, если пользователь на 2 шаге
            formValid: (day.isEmpty),
            //Текст активной кнопки, если пользователь на 2 шаге
            buttonActive: "Done",
            //html шаблон
            template: <SecondStep dosesList={dosesList} reminders={reminders} day={day}
                                  handleInputChange={handleInputChange}
                                  handleRemoveClick={handleRemoveClick}
                                  handleAddClick={handleAddClick}/>
        }
    ]


    let disabled = mobileScreen?
        pageValues[currentStep].formValid:
        pageValues[0].formValid + pageValues[1].formValid;

    let onClick = mobileScreen?
        pageValues[currentStep].func:
        pageValues[1].func;

    return (
        <div className="adding-form">
            {mobileScreen ?
                <div className="header content-container-only-mobile">
                    <span className="arrow-left"/>
                    <span className="close" onClick={action(() => props.changePage(props.pagesObj.pages[0]))}/>
                </div>: ""
            }
            <h2 className="content-container-only-mobile">{pageValues[currentStep].h2}</h2>
            <form name="createPill" className="create-pill">
                {mobileScreen? pageValues[currentStep].template:
                    pageValues.map(x => x.template)}
            </form>
            <div className="content-container-only-mobile mobile-fixed-button-container">
                <button disabled={disabled}
                        className="first-btn adding-button"
                        onClick={onClick}
                        type="button" form="createPill">
                    <span className="active-state">{pageValues[currentStep].buttonActive}</span>
                    <span className="disabled-state">Fill in the fields</span>
                </button>
            </div>
        </div>
    )
})

export default AddingPage