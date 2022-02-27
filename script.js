 // function to set a given theme/color-scheme
 function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}

// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
        document.getElementById('checkbox').checked = false;
    } else {
        setTheme('theme-light');
      document.getElementById('checkbox').checked = true;
    }
})();

// Clock
let clock = setInterval(setCurrentTime,1000);

function setCurrentTime()
{
    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    document.getElementById("current-time").innerText = `${String(hours).padStart(2,0)} : ${String(minutes).padStart(2,0)} : ${String(seconds).padStart(2,0)}`;
}

// Stop Watch

let startTime = null;
let currentTimeElapsed=null;
let timerId = null;
let previousTime = 0;
function startTimer()
{
    startTime = Date.now();
    console.log(startTime);

    clearInterval(timerId);
    timerId = setInterval(function() {
        currentTimeElapsed = Date.now() - startTime + previousTime;
        setTimerUpdate();
    },10);
}

function setTimerUpdate(){
    let currentMilliSecondsElapsed = currentTimeElapsed%1000;
    let currentSecondsElapsed = currentTimeElapsed / 1000;
    let currentMinutesElapsed = currentSecondsElapsed / 60;
    let currentHourElapsed = currentMinutesElapsed / 60;

    document.getElementById("timer").innerText = `${String(Math.floor(currentHourElapsed%24)).padStart(2,0)} : ${String(Math.floor(currentMinutesElapsed)%60).padStart(2,0)} : ${String(Math.floor(currentSecondsElapsed)%60).padStart(2,0)} : ${String(Math.floor(currentMilliSecondsElapsed)).padStart(3,0)}`;
}

function stopTimer()
{
    if(timerId){
        clearInterval(timerId);
        previousTime = currentTimeElapsed;
    } 
}

function resetTimer(){
    previousTime=0;
    if(timerId){
        clearInterval(timerId);
    } 
    document.getElementById("timer").innerText = `00 : 00 : 00 : 000`;
}

// Alarm Clock

function hoursMenu(){

	var select = document.getElementById('alarmhrs');
	var hrs = 23

	for (i=0; i <= hrs; i++) {
		select.options[select.options.length] = new Option( i < 10 ? "0" + i : i, i);
	}
}
hoursMenu();

function minMenu(){

	var select = document.getElementById('alarmmins');
	var min = 59;

	for (i=0; i <= min; i++) {
		select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
	}
}
minMenu();

function secMenu(){

	var select = document.getElementById('alarmsecs');
	var sec = 59;

	for (i=0; i <= sec; i++) {
		select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
	}
}
secMenu();

let alarmTimerId=null;
function setAlarm()
{
    var hr = document.getElementById('alarmhrs');
	
	var min = document.getElementById('alarmmins');
	
	var sec = document.getElementById('alarmsecs');


    let hour = parseInt(hr.options[hr.selectedIndex].value);
    let minute = parseInt(min.options[min.selectedIndex].value);
    let second = parseInt(sec.options[sec.selectedIndex].value);

    console.log(hour,minute,second);

    
    let currentDate = new Date();
    let currentHours = currentDate.getHours();
    let currentMinutes = currentDate.getMinutes();
    let currentSeconds = currentDate.getSeconds();

    let secondDiff = second - currentSeconds;
    if(secondDiff < 0)
    {
        secondDiff = 60 + secondDiff;
        minute--;
    }

    let minuteDiff = minute - currentMinutes;
    if(minuteDiff < 0)
    {
        minuteDiff = 60 + minuteDiff;
        hour--;
    }

    let hourDiff = hour - currentHours;
    if(hourDiff < 0)
    {
        hourDiff = (hourDiff+24)%24;
    }

    let totalMilliSecondDiff = (((hourDiff*60) + minuteDiff)*60 + secondDiff)*1000;

    clearTimeout(alarmTimerId);
    alarmTimerId = setTimeout(function(){ alert("Alarm Ringing!") },totalMilliSecondDiff);

    document.getElementById('alarmhrs').disabled = true;
	document.getElementById('alarmmins').disabled = true;
	document.getElementById('alarmsecs').disabled = true;
}

function clearAlarm()
{
    clearTimeout(alarmTimerId);

    document.getElementById('alarmhrs').disabled = false;
	document.getElementById('alarmmins').disabled = false;
	document.getElementById('alarmsecs').disabled = false;
}