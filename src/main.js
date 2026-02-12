//creating element
const displaytimeEL = document.getElementById("displaytime");
const hourEl = document.getElementById("hour-input");
const minEL = document.getElementById("min-input");
const ampmEL = document.getElementById("ampm-input");
const alarmAudio = document.getElementById("audio-alarm");
const setalarmbtnEL = document.getElementById("setalarmbtn");
const cancelalarmBtnEl = document.getElementById("cancelAlarmBtn");
const snoozealarmBtnEL = document.getElementById("snoozeAlarmBtn");
let alarmNotify = document.getElementById("alarm-set-time");


let alarmTime = "";
let isRinging = false;
const SnoozeTime = 1;

//display current time

function displayTime() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const amPm = hour > 12 ? "PM" : "AM";
  hour = (hour % 12 || 12).toString().padStart(2, "0");
  displaytimeEL.textContent = `${hour}:${minute}:${seconds} ${amPm}`;
  const checkTime = `${hour} : ${minute} ${amPm}`;


  if (alarmTime === checkTime && !isRinging) {
    isRinging = true;
    audioAlarm();
    alert("RING RING");
    cancelalarmBtnEl.style.display = "flex";
    snoozealarmBtnEL.style.display = "flex"

  }
}
setInterval(displayTime, 1000);
displayTime();
//alarm set
setalarmbtnEL.addEventListener("click", () => {
  const hour = hourEl.value.trim();
  const minute = minEL.value.trim();
  const ampm = ampmEL.value;

  if (hour === "" || minute === "") {
    alert("Enter Your Time");
    return;
  }

  let hourval = Number(hour);
  let minval = Number(minute);

  if (
    Number.isNaN(hourval) ||
    hourval > 12 ||
    hourval < 0 ||
    minval > 59 ||
    minval < 0 ||
    Number.isNaN(minval)
  ) {
    alert("Enter Your Valid Time ");
    return;
  }
  const h = hourval.toString().padStart(2, "0");
  const m = minval.toString().padStart(2, "0");
  alarmTime = `${h} : ${m} ${ampm}`;
  alarmNotify.textContent = `${h} : ${m} ${ampm}`;
  alert(`ALarm Set at  ${h} : ${m} ${ampm} `);
});
//audio set
function audioAlarm() {
  alarmAudio.play();
  alarmAudio.loop = true;
}
//clear time and audio
cancelalarmBtnEl.addEventListener("click", () => {
  isRinging = false;
  alarmAudio.pause();
  alarmTime = "";
});
// snooze time
snoozealarmBtnEL.addEventListener("click", () => {
  isRinging = false;
  alarmAudio.pause();
  const now = new Date();
  const hour = now.getHours();
  now.setMinutes(now.getMinutes() + SnoozeTime)
  const min = now.getMinutes().toString().padStart(2, "0")
  const amPm = hour > 12 ? "PM" : "AM";
  hour = (hour % 12 || 12).toString().padStart(2, "0");

  alarmTime = `${hour} : ${min} ${amPm}`;
});
