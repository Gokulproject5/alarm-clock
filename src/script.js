const hour = document.getElementById("hour-Input");
let min = document.getElementById("min-Input");
const merdian = document.getElementById("select-box");
const setBtn = document.getElementById("set-btn");
const cancelBtn = document.getElementById("cancel-btn");
const snoozeBtn = document.getElementById("snooze-btn");
const time = document.getElementById("time");
const alarmAudio = document.getElementById("alarm-audio")

// variable

let alarmTime = "";
let isRinging = false ;
const snoozeTime = 1;

// Display the time  

const displayTime =()=>{
    let now = new Date();
    let hour = now.getHours();
    let min = now.getMinutes().toString().padStart(2,0);
    let sec = now.getSeconds().toString().padStart(2,0);

    let merdian = hour > 12 ? "PM" : "AM";
    hour = (hour % 12 || 12).toString().padStart(2,0);
     
    let currentTime =`${hour} : ${min} : ${sec}  ${merdian} `
    time.innerText =currentTime ;

    let check = `${hour} : ${min} ${merdian}`

       console.log(alarmTime === check );
        console.log(alarmTime)
        console.log(check);
        
    if (alarmTime === check ) {
      
        
        alarmAudio.play();
       snoozeBtn.style.display = "flex"
        
    }

}

setInterval(displayTime,1000);


setBtn.addEventListener("click",()=>{
    setALarm();
})

const setALarm = ()=>{

  let hours = hour.value
  let mins = min.value.toString().padStart(2,0)
  let merdians = merdian.value
   if(hours==="00" || mins==="00"){
    alert("enter valid time");
    return
   }

     hours = Number(hours);
     mins = Number(mins)
   if (hours <0 || mins <0
    || hours >12 || mins >59 ||
    Number.isNaN(hours) || Number.isNaN(mins)
   ) {
    alert("Enter valid time");
    return
   }

   hours = hour.value.toString().padStart(2,0)

   alarmTime = `${hours} : ${mins} ${merdians}`;
  
   
}


// Cancel the Alarm 

  cancelBtn.addEventListener("click",()=>{
    cancelAlarm();
  })

  const cancelAlarm = ()=>{
    alarmTime = "";
   
  }

snoozeBtn.addEventListener("click",()=>{
    snoozeAlarm();
})

const snoozeAlarm = ()=>{
   let mins = Number(min.value) + 1
   alarmTime = `${hour.value} : ${mins} ${merdian.value}`
}