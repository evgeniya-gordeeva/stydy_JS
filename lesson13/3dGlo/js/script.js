window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    //Timer
    function countTimer (deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining () {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow)/1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60),
                day = Math.floor(timeRemaining / 60 / 60 / 24);

            hours = (hours < 10) ? '0' + hours : hours;
            minutes = (minutes < 10) ? '0' + minutes : minutes;
            seconds = (seconds < 10) ? '0' + seconds : seconds;

            return {timeRemaining, hours, minutes, seconds};
        }

        function updateClock () {
            let timer = getTimeRemaining();

            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

            if (timer.timeRemaining < 0) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }

        updateClock ();
    }

    //setInterval(countTimer, 1000, '1 july 2019');
    setInterval(countTimer, 1000, '26 november 2019');



    //Menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = document.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((elem) => { elem.addEventListener('click', handlerMenu); });
    };

    toggleMenu();



    //popup

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popUpClose = document.querySelectorAll('.popup-close'),
            popupContent = document.querySelector('.popup .popup-content');

        let count = 0;

        //animate
        let popupShowInterval;
        let popupAnimate = function () {
            popupShowInterval = requestAnimationFrame(popupAnimate);
            count++;
            if(count <= 38) {
                popupContent.style.left = count + '%';
            } else {
                cancelAnimationFrame(popupShowInterval);
                count = 0;
            }
        };

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';

                //если ширина экрана меньше 768px - анимацию не показываем
                if(document.documentElement.clientWidth >= 768) {
                    popupShowInterval = requestAnimationFrame(popupAnimate);
                }

            });
        });

        popUpClose.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'none';

                if(document.documentElement.clientWidth >= 768) {
                    popupContent.style.left = 0;
                }
            });
        });
    };

    togglePopUp();


});