let money = 30003,
    income = 'фриланс',
    addExpenses = 'абонемент в спортзал, кинотеатр, посиделки в кафе',
    deposit = true,
    mission = 100000,
    period = 6;

//Вывести в консоль тип данных значений переменных money, income, deposit;
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

//Вывести в консоль длину строки income
console.log(income.length);

//Вывести в консоль “Период (period) месяцев” и “Цель заработать (mission) рублей/долларов/гривен/юани”
console.log('Период ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

//Привести строку addExpenses к нижнему регистру и разбить строку на массив, вывести массив в консоль
console.log(addExpenses.toLowerCase().split(','));

/*
Объявить переменную budgetDay и присвоить дневной бюджет (доход за месяц / 30),
вывести в консоль результат и остаток от деления
*/
let budgetDay = money / 30;
console.log(budgetDay);
console.log(money%30);