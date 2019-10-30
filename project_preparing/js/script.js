'use strict';

let money;
let start = function () {
    do {
        money = Number(prompt('Ваш месячный доход?', 50000));
    }
    while(isNaN(money) || money === '' || money === null || money === 0);
};

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    asking: function () {

        if(confirm('Есть ли у вас дополнительный заработок?')) {
            let itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Такси');
            while(!isNaN(itemIncome) || itemIncome === '' || itemIncome === null) {
                itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Такси');
            }


            let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            while(isNaN(cashIncome) || cashIncome === '' || cashIncome === null) {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            }

            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            const tempKeyArray = ['аренда жилья', 'питание', 'бензин', 'оплата детского сада', 'платеж по ипотеке'];
            let tempKey = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Например, ' + tempKeyArray[Math.floor(Math.random() * tempKeyArray.length)]),
                tempValue;

            while(!isNaN(tempKey) || tempKey === '' || tempKey === null) {
                tempKey = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Например, ' + tempKeyArray[Math.floor(Math.random() * tempKeyArray.length)]);
            }

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
    },
    getInfoDeposit: function () {
        if(appData.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?', '10');
            while(isNaN(appData.percentDeposit) || appData.percentDeposit === '' || appData.percentDeposit === null) {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            }

            appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');
            while(isNaN(appData.moneyDeposit) || appData.moneyDeposit === '' || appData.moneyDeposit === null) {
                appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');
            }

        }
    },
    calcSaveMoney: function () {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getBudget();


console.log('Расходы за месяц: ' + appData.getExpensesMonth());

console.log('Cрок достижения цели в месяцах: ', Math.ceil(appData.getTargetMonth()));

console.log('Уровень дохода: ' + appData.getStatusIncome());

let formatedExpenses = [];
for (let i = 0; i < appData.addExpenses.length; i++) {
    let tempStr = appData.addExpenses[i].toString().trim();
    formatedExpenses[i] = tempStr[0].toUpperCase() + tempStr.slice(1);
}

console.log(formatedExpenses.join(', '));

/*
console.log('=============\nНаша программа включает в себя данные\n=============');
for (let key in appData)  {
    console.log(key);
}
*/
