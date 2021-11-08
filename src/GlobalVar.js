import {action, observable} from "mobx";
import React from 'react';

let screen=observable(window.innerWidth);
window.onload= action(() => screen=window.innerWidth);
window.onresize = action(() => screen=window.innerWidth);

export let mobileScreen = screen < 800;
export let days= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
