'use strict';

/*
 Добрый день (утро, вечер, ночь в зависимости от времени суток)
 Сегодня: Понедельник
 Текущее время:12:05:15 PM
 До нового года осталось 175 дней
*
* */
let today = new Date();

let counterContent = document.createElement('div');

const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const greetings = ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер'];

let dayPart = 0;
switch (true) {
    case (today.getHours()>=4 && today.getHours() < 12):
        dayPart = 1;
        break;
    case (today.getHours()>=12 && today.getHours() < 17):
        dayPart = 2;
        break;
    case (today.getHours()>=17 && today.getHours() < 23):
        dayPart = 3;
        break;
    default:
        dayPart = 0;
};

function currentTime(date) {
    let hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
    let minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    let seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
    let afternoon = date.getHours() > 12 ? ' PM' : ' AM';

    document.querySelector('#currentTime').innerHTML = hours + ':'+ minutes + ':' + seconds + afternoon;
}

function NYComing(date) {
    let daysUntillNY = Math.round((new Date(date) - new Date())/(3600*24*1000));
    //console.log(daysUntillNY);
    document.querySelector('#NYComingDays').innerHTML = daysUntillNY;
}

counterContent.innerHTML = '<div>'+ greetings[dayPart] +'</div>' +
    '<div>Сегодня: ' + weekDays[today.getDay()] + '</div>' +
    '<div>Текущее время: <span id="currentTime"></span></div>' +
    '<div>До нового года осталось <span id="NYComingDays">?</span> дней</div>';

document.body.append(counterContent);

setInterval(function(){currentTime(new Date());}, 1000);

NYComing('2020, 1, 1');