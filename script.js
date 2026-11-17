const schedule = [];
let currentIndex = 0;
let remaining = 0;
let timer = null;

const scheduleDiv = document.getElementById('schedule');

function renderSchedule(){
scheduleDiv.innerHTML='';
schedule.forEach((item,i)=>{
const div=document.createElement('div');
div.textContent=`${i+1}. ${item.type==='walk'?'Wandelen':'Hardlopen'} - ${item.minutes} min - ${item.speed} km/u`;
scheduleDiv.appendChild(div);
});
}

document.getElementById('addBtn').addEventListener('click',()=>{
const type=document.getElementById('type').value;
const minutes=parseInt(document.getElementById('minutes').value);
const speed=parseFloat(document.getElementById('speed').value);
if(!minutes||!speed) return;
schedule.push({type,minutes,speed});
renderSchedule();
});

function showBlock(){
if(currentIndex>=schedule.length){
clearInterval(timer);
document.getElementById('currentActivity').textContent='✅ Training voltooid';
document.getElementById('timer').textContent='00:00';
return;
}

const block=schedule[currentIndex];
remaining=block.minutes*60;
document.body.className=block.type==='walk'?'walk-mode':'run-mode';
document.getElementById('currentActivity').textContent=block.type==='walk'?'🚶 Wandelen':'🏃 Hardlopen';
document.getElementById('speedDisplay').textContent=`Snelheid: ${block.speed} km/u`;
}

function updateTimer(){
const m=Math.floor(remaining/60);
const s=remaining%60;
document.getElementById('timer').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
remaining--;
if(remaining<0){
currentIndex++;
showBlock();
}
}

document.getElementById('startBtn').addEventListener('click',()=>{
if(schedule.length===0) return;
clearInterval(timer);
currentIndex=0;
showBlock();
updateTimer();
timer=setInterval(updateTimer,1000);
});

document.getElementById('resetBtn').addEventListener('click',()=>{
clearInterval(timer);
currentIndex=0;
document.getElementById('timer').textContent='00:00';
document.getElementById('currentActivity').textContent='Klaar om te starten';
});
