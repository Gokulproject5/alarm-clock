//creating element
const displaytimeEL = document.getElementById("displaytime");
const hourEl = document.getElementById("hour-input");
const minEL = document.getElementById("min-input");
const ampmEL = document.getElementById("ampm-input");
const alarmAudio = document.getElementById("audio-alarm");
const setalarmbtnEL = document.getElementById("setalarmbtn");
const cancelalarmBtnEl = document.getElementById("cancelAlarmBtn");
const snoozealarmBtnEL = document.getElementById("snoozeAlarmBtn");

let alarmTime = "";
let isRinging = false;
const SnoozeTime = 1;

//display current time

function displayTime() {
  let now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes().toString().padStart(2, "0");
  let seconds = now.getSeconds().toString().padStart(2, "0");
  const amPm = hour > 12 ? "PM" : "AM";
  hour = (hour % 12 || 12).toString().padStart(2, "0");
  displaytimeEL.textContent = `${hour}:${minute}:${seconds} ${amPm}`;
  let checkTime = `${hour} : ${minute} ${amPm}`;
  console.log(checkTime);
  console.log(alarmTime);

  if (alarmTime === checkTime && !isRinging) {
    isRinging = true;
    audioAlarm();
    alert("Alarm set Sucessfully");
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
    alert("Enter time");
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
    alert("Enter valid Time ");
    return;
  }
  const h = hourval.toString().padStart(2, "0");
  const m = minval.toString().padStart(2, "0");
  alarmTime = `${h} : ${m} ${ampm}`;
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
  let now = new Date();
  let hour = now.getHours();
  now.setMinutes(now.getMinutes() +  SnoozeTime)
  let min = now.getMinutes().toString().padStart(2,"0")
  let amPm = hour > 12 ? "PM" : "AM";
  hour = (hour % 12 || 12).toString().padStart(2, "0");

  alarmTime = `${hour} :${min} ${amPm}`;
});
