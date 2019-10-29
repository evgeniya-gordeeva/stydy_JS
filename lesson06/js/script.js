'use strict';

let money;
let start = function () {
    do {
        money = Number(prompt('Ваш месячный доход?', 50000));
    } while(isNaN(money) || money === '' || money === null || money === 0);
};

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            const tempKeyArray = ['аренда жилья', 'питание', 'бензин', 'оплата детского сада', 'платеж по ипотеке'];
            let tempKey = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Например, ' + tempKeyArray[Math.floor(Math.random() * tempKeyArray.length)]),
                tempValue;
            while(isNaN(tempValue) ||tempValue === '' || tempValue === null || tempValue === 0) {
                tempValue = +prompt('Во сколько это обойдется?', 9500);
            }
            appData.expenses[tempKey] = tempValue;
        }

    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function () {
        let sum = 0;

        for (let key in appData.expenses)  {
            sum = sum + appData.expenses[key];
        }

        appData.expensesMonth = sum;
        return sum;
    },
    getBudget: function () {
        appData.budgetMonth = money - appData.getExpensesMonth();
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth: function () {
        return (appData.mission/appData.budgetMonth);
    },
    getStatusIncome: function () {
        if(appData.budgetDay > 0) {
            if(appData.budgetDay >= 800) {
                return ('Высокий уровень дохода');
            } else if (appData.budgetDay >= 300 && appData.budgetDay < 800){
                return ('Средний уровень дохода');
            } else {
                return ('Низкий уровень дохода');
            }
        } else {
            return ('Что-то пошло не так');
        }
    }
};

appData.asking();
appData.getBudget();

/*
* В консоль вывести:
 — Расходы за месяц
 — За какой период будет достигнута цель (в месяцах)
 — Уровень дохода
* */
console.log('Расходы за месяц: ' + appData.getExpensesMonth());

//Cрок достижения цели в месяцах (значение округлить в меньшую сторону)
console.log('Cрок достижения цели в месяцах: ', Math.ceil(appData.getTargetMonth()));

console.log('Уровень дохода: ' + appData.getStatusIncome());

/*
* 10) Используя цикл for in для объекта (appData), вывести в консоль сообщение "Наша программа включает в себя данные: " (вывести весь appData)
* */

console.log('=============\nНаша программа включает в себя данные\n=============');
for (let key in appData)  {
    console.log(key);
}
