'use strict';

//Получить кнопку "Рассчитать" через id
let button = document.getElementById('start');
console.log(button);

//Получить кнопки “+” (плюс) через Tag, каждую в своей переменной.
/*
for (let i = 0; i < document.getElementsByTagName('button').length; i++) {
    if(document.getElementsByTagName('button')[i].className.indexOf('btn_plus')!=-1) {
        console.log(document.getElementsByTagName('button')[i]);
    }
}
*/
//уточнение из дискорда: просто первые 2 тега button записать в переменные
let tagPlus1 = document.getElementsByTagName('button')[0];
console.log(tagPlus1);

let tagPlus2 = document.getElementsByTagName('button')[1];
console.log(tagPlus2);

//получить чекбокс по id через querySelector
let checkbox = document.querySelector('#deposit-check');
console.log(checkbox);

//Получить поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll
let additionalIncomeItems = document.querySelectorAll('.additional_income-item');
console.log(additionalIncomeItems);

//Получить все блоки в правой части программы через классы (которые имеют класс название-value,
// начиная с class="budget_day-value" и заканчивая class="target_month-value">)
let rightPartValues = document.querySelectorAll('[class*="value"]');
console.log(rightPartValues);

//Получить оставшиеся поля через querySelector каждый в отдельную переменную (Инпуты с левой стороны не забудьте про range)
let salaryAmount = document.querySelector('.salary-amount');
console.log(salaryAmount);

let incomeTitle = document.querySelector('.income-title');
console.log(incomeTitle);

let incomeAmount = document.querySelector('.income-amount');
console.log(incomeAmount);

let additionalIncomeItem1 = document.querySelectorAll('.additional_income-item')[0];
console.log(additionalIncomeItem1);

let additionalIncomeItem2 = document.querySelectorAll('.additional_income-item')[1];
console.log(additionalIncomeItem2);

let expensesTitle1 = document.querySelectorAll('.expenses-title')[0];
console.log(expensesTitle1);

let expensesTitle2 = document.querySelectorAll('.expenses-title')[1];
console.log(expensesTitle2);

let additionalExpensesItem = document.querySelector('.additional_expenses-item');
console.log(additionalExpensesItem);

let targetAmount = document.querySelector('.target-amount');
console.log(targetAmount);

let periodSelect = document.querySelector('.period-select');
console.log(periodSelect);


