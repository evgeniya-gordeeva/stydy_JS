'use strict';

let money,
    income = 'фриланс',
    //addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 100000,
    period = 6;

let start = function () {
    do {
        money = Number(prompt('Ваш месячный доход?', 50000));
    } while(isNaN(money) || money === '' || money === null || money === 0);
};

start();

let showTypeof  = function (data) {
    console.log(data, typeof(data));
};

let requiredExpenses01Label,
    requiredExpenses02Label;

let expenseAmount = getExpensesMonth();

// Результат getAccumulatedMonth сохранить в переменную accumulatedMonth
let accumulatedMonth = getAccumulatedMonth();

let budgetDay = getTargetMonth() / 30;


//------------------------
// Функции
//------------------------

// getExpensesMonth возвращает сумму всех расходов за месяц
function getExpensesMonth() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        if(i===0) {
            requiredExpenses01Label = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Например, аренда жилья');
        }
        if(i===1) {
            requiredExpenses02Label = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Например, питание');
        }
        let tempNum;
        while(isNaN(tempNum) || tempNum === '' || tempNum === null || tempNum === 0) {
            tempNum = +prompt('Во сколько это обойдется?', 9500);
        }
        sum = sum + tempNum;

    }
    return sum;
}



// getAccumulatedMonth возвращает Накопления за месяц (Доходы минус расходы).
function getAccumulatedMonth() {
    return (money - expenseAmount);
}

// getTargetMonth подсчитывает за какой период будет достигнута цель,
// зная результат месячного накопления и возвращает результат
function getTargetMonth() {
    return (mission/accumulatedMonth);
}

function getStatusIncome() {
    if(budgetDay > 0) {
        if(budgetDay >= 800) {
            console.log('Высокий уровень дохода');
        } else if (budgetDay >= 300 && budgetDay < 800){
            console.log('Средний уровень дохода');
        } else {
            console.log('Низкий уровень дохода');
        }
    } else {
        console.log('Что-то пошло не так');
    }
}

//п.2
//Оставить функции showTypeof и getStatusIncome, которые написали в уроке
showTypeof(money);
showTypeof(income);
showTypeof(deposit);

getStatusIncome();

//Накопления за период
console.log(getAccumulatedMonth()*period);

//Cрок достижения цели в месяцах (значение округлить в меньшую сторону)
console.log('Cрок достижения цели в месяцах: ', Math.floor(getTargetMonth()));

console.log((getTargetMonth() > 0) ? 'Цель будет достигнута' : 'Цель не будет достигнута');