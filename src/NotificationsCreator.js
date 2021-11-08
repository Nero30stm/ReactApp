
let intervalsFunc = null;

function notification(foo, daysArray, daysObj, name) {
    new window.Notification('Пора пить лекарство ' + name);
    foo(daysArray, daysObj);
}

let addIntervals = (daysArray, daysObj)=> {
    let foundDay= daysArray.find(el => el.name == daysObj.current);
    let now = new Date();
    let name = "";
    let min = Number.MAX_VALUE;

    foundDay.arr.forEach(pill => {
        pill["dose"].forEach(doseItem => {
            if(!doseItem.resolved) {
                let doseTime = new Date();
                doseTime.setHours(doseItem.time.slice(0, 2));
                doseTime.setMinutes(doseItem.time.slice(3, 5));
                if ((doseTime - now) < min && doseTime > now) {
                    min = (doseTime - now);
                    name = pill.name;
                    console.log(min);
                }
            }
        })
    })

    if(min < Number.MAX_VALUE)
    {
        clearTimeout(intervalsFunc);
        intervalsFunc = setTimeout(notification, min, addIntervals, daysArray, daysObj, name);
    }
}

export default addIntervals