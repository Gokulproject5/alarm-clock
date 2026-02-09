// Elements
const displaytimeEl = document.getElementById("time");
const hourInputEl = document.getElementById("hour-Input");
const minInputEl = document.getElementById("min-Input");
const selectBox = document.getElementById("select-box");
const setALarmEl = document.getElementById("set-btn");
const cancelAlarmEl = document.getElementById("cancel-btn");
const snoozeALarmEl = document.getElementById("snooze-btn");
const alarmAudio = document.getElementById("alarm-audio");

// variable
let alarmTime = "";
let isRinging = false;
// display the current time

const displayTime = () => {
  let now = new Date();
  let hour = now.getHours();
  let min = now.getMinutes().toString().padStart(2, 0);
  let sec = now.getSeconds().toString().padStart(2, 0);

  let merdian = hour >= 12 ? "PM" : "AM";

  hour = (hour % 12 || 12).toString().padStart(2, 0);

  let currentTime = `<span>${hour}</span> : <span>${min}</span> : <span>${sec}</span> <span>${merdian}</span>`;
  displaytimeEl.innerHTML = currentTime;

  let check = `${hour}:${min} ${merdian}`;



  if (alarmTime === check && !isRinging) {
    isRinging = true;
    triggerAlarm();
    snoozeALarmEl.style.display = "flex";
  }
};
setInterval(displayTime, 1000);
displayTime();

// set alarm

setALarmEl.addEventListener("click", () => {
  setAlarm();
});

const setAlarm = () => {
  let min = minInputEl.value.trim().toString().padStart(2, 0);
  let hour = hourInputEl.value.trim().toString().padStart(2, 0);

  //    check empty box
  if (min === "00" || hour === "00") {
    alert("Entry Valid Time ");
    return;
  }

  if (
    Number.isNaN(hour) ||
    Number.isNaN(min) ||
    hour < 0 ||
    hour > 12 ||
    min < 0 ||
    min > 59
  ) {
    alert("enter valid time");
    return;
  }
  alarmTime = `${hour}:${min} ${selectBox.value}`;

  
};

//  cancel alarm

cancelAlarmEl.addEventListener("click", () => {
  cancelAlarm();
});

const cancelAlarm = () => {
  alarmTime = "";
  snoozeALarmEl.style.display = "none";
};

//  snooze alarm

snoozeALarmEl.addEventListener("click", () => {
  snoozeAlarm();
});

const snoozeAlarm = () => {
  isRinging = false ;
  triggerAlarm();
  let snoozeTime = 1;
  let now = new Date();
  now.setMinutes(now.getMinutes() + snoozeTime);
  let hour = now.getHours();
  let min = now.getMinutes().toString().padStart(2, 0);

  let merdian = hour >= 12 ? "PM" : "AM";

  hour = (hour % 12 || 12).toString().padStart(2, 0);
  alarmTime = `${hour}:${min} ${merdian}`;
  minInputEl.value = min
  snoozeALarmEl.style.display = "none";
};
const triggerAlarm = () => {
  if (!isRinging) {
   alarmAudio.pause();
   return
  }
   alarmAudio.play();
};
