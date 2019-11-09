'use strict';

let start = document.getElementById('start'),
    cancelBtn = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesTitle = document.querySelectorAll('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount');

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function () {
        /*
        if(salaryAmount.value === '') {
            alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
            return;
        }*/

        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getAddExpenses();
        appData.getAddIncome();

        appData.getBudget();
        appData.showResult();

        start.style.display = 'none';
        for(let i=0; i< document.querySelectorAll('.data input[type="text"]').length; i++) {
            document.querySelectorAll('.data input[type="text"]')[i].setAttribute('disabled', 'disabled');
        }
        cancelBtn.style.display = 'block';
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.getElementsByClassName('expenses-title')[0].value = '';
        cloneExpensesItem.getElementsByClassName('expenses-amount')[0].value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        //console.log(expensesItems);
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
            return;
        }
    },
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.getElementsByClassName('income-title')[0].value = '';
        cloneIncomeItem.getElementsByClassName('income-amount')[0].value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        //console.log(incomeItems);
        if(incomeItems.length === 3) {
            incomePlus.style.display = 'none';
            return;
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if(itemExpenses != '' && cashExpenses != '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });

        //console.log(appData.expenses);
    },
    getIncome: function () {
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;

            if(itemIncome != '' && cashIncome != '') {
                appData.income[itemIncome] = cashIncome;
            }
        });

        //appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let key in appData.income) {
            appData.income += +appData.income[key];
        }

        //console.log(appData.income);
    },
    showResult: function () {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcSaveMoney();

        periodSelect.addEventListener('change', function () {
            incomePeriodValue.value = appData.calcSaveMoney();
        });
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if(item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        additionalIncomeItems.forEach(function (item) {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });

        //console.log(additionalIncomeItems);
    },
    getExpensesMonth: function () {
        let sum = 0;

        for (let key in appData.expenses)  {
            sum = sum + appData.expenses[key]*1;
        }

        appData.expensesMonth = sum;
        //console.log(appData.expensesMonth);

        return sum;
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.getExpensesMonth();
        appData.budgetDay = Math.round(appData.budgetMonth / 30);

        //console.log(appData.budgetMonth);
    },
    getTargetMonth: function () {
        return (targetAmount.value/appData.budgetMonth);
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
        return appData.budgetMonth * periodSelect.value;
    },
    changeRange: function () {
        document.querySelector('.period-amount').textContent = periodSelect.value;
    }
};

start.setAttribute('style', 'opacity: .3; pointer-events: none;');

salaryAmount.addEventListener('change', function () {
    if(salaryAmount.value !== '') {
        start.removeAttribute('style');
    } else {
        start.setAttribute('style', 'opacity: .3; pointer-events: none;');
    }
});

start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('change', appData.changeRange);

for(let i = 0; i< document.querySelectorAll('[placeholder="Наименование"]').length; i++) {
    document.querySelectorAll('[placeholder="Наименование"]')[i].addEventListener('keyup', function () {
        this.value = this.value.replace(/[^А-Яа-яЁё\s,.!?;:()]/g, '');
    });
}

for(let i = 0; i< document.querySelectorAll('[placeholder="Сумма"]').length; i++) {
    document.querySelectorAll('[placeholder="Сумма"]')[i].addEventListener('keyup', function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
}


//console.log('Расходы за месяц: ' + appData.getExpensesMonth());

//console.log('Cрок достижения цели в месяцах: ', Math.ceil(appData.getTargetMonth()));

//console.log('Уровень дохода: ' + appData.getStatusIncome());


