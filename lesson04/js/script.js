'use strict';

let money = Number(prompt('Ваш месячный доход?', 50000)),
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 100000,
    period = 6;

let showTypeof  = function (data) {
    console.log(data, typeof(data));
};

let requiredExpenses01Label = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Например, аренда жилья');
let requiredExpenses01Value = Number(prompt('Во сколько это обойдется?', 10000));
let requiredExpenses02Label = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Например, питание');
let requiredExpenses02Value = Number(prompt('Во сколько это обойдется?', 10000));

// Результат getAccumulatedMonth сохранить в переменную accumulatedMonth
let accumulatedMonth = getAccumulatedMonth();

let budgetDay = getTargetMonth() / 30;


//------------------------
// Функции
//------------------------

// getExpensesMonth возвращает сумму всех расходов за месяц
function getExpensesMonth () {
    return (requiredExpenses01Value + requiredExpenses02Value);
}

// getAccumulatedMonth возвращает Накопления за месяц (Доходы минус расходы).
function getAccumulatedMonth() {
    return (money - getExpensesMonth());
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