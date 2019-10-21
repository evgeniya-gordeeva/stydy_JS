'use strict';

let money = Number(prompt('Ваш месячный доход?')), //п.1
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'), //п.2
    deposit = confirm('Есть ли у вас депозит в банке?'), //п.3
    mission = 100000,
    period = 6;


//п.2
if(addExpenses) { //тут if, чтобы не валились ошибки, если ничего не ввели
    console.log(addExpenses.toLowerCase().split(','));
}

//п.4
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

//п.5
let requiredExpenses01Label = prompt('Какие обязательные ежемесячные расходы у вас есть?');
let requiredExpenses01Value = prompt('Во сколько это обойдется?')*1;
let requiredExpenses02Label = prompt('Какие обязательные ежемесячные расходы у вас есть?');
let requiredExpenses02Value = +prompt('Во сколько это обойдется?');

//п.6
let budgetMonth = money - requiredExpenses01Value - requiredExpenses02Value;
console.log('budgetMonth: ', budgetMonth);

//п.7
console.log('Кол-во месяцев для достижения цели: ', Math.ceil(mission/budgetMonth));

//п.8
let budgetDay = budgetMonth / 30;
console.log(Math.floor(budgetDay));

//п.9
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

