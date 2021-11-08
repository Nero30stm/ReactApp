function PillObj(name, dose_value, meal, icon, reminders, _dose) {
    this.name = name;
    this.meal = meal;
    this.dose_value = dose_value;
    this.icon = "pill-" + icon;
    this.reminders = reminders;
    this.dose = _dose;

    _dose.forEach(d => {

    })
}
export default PillObj;