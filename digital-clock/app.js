const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const timeFormat = document.getElementById('time-format');

const clock = ()=> {
    setInterval(() => {
        let current  = new Date();
        let hour = current.getHours();
        if(hour < 12){
            timeFormat.innerHTML = 'AM';
        }
        else {
            timeFormat.innerHTML = 'PM';
            hour = hour % 12;
        }
    
        hours.innerHTML = updateTime(hour);
    
        minutes.innerHTML = updateTime(current.getMinutes());
        
        seconds.innerHTML = updateTime(current.getSeconds());
    },1000)
};

function updateTime(t) {
    if(t < 10) return '0' + t;
    else return t;
}

clock();