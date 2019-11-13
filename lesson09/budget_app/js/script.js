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
    periodAmount = document.querySelector('.period-amount'),
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
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getAddExpenses();
        this.getAddIncome();

        this.getBudget();
        this.showResult();

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
    },
    getIncome: function () {
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;

            if(itemIncome != '' && cashIncome != '') {
                appData.income[itemIncome] = cashIncome;
            }
        });

        //this.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let key in this.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    showResult: function () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSaveMoney();

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
        })
    },
    getExpensesMonth: function () {
        let sum = 0;

        for (let key in this.expenses)  {
            sum = sum + this.expenses[key]*1;
        }

        this.expensesMonth = sum;
        return sum;
    },
    getBudget: function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.getExpensesMonth();
        this.budgetDay = Math.round(this.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return (targetAmount.value/this.budgetMonth);
    },
    getStatusIncome: function () {
        if(this.budgetDay > 0) {
            if(this.budgetDay >= 800) {
                return ('Высокий уровень дохода');
            } else if (this.budgetDay >= 300 && this.budgetDay < 800){
                return ('Средний уровень дохода');
            } else {
                return ('Низкий уровень дохода');
            }
        } else {
            return ('Что-то пошло не так');
        }
    },
    getInfoDeposit: function () {
        if(this.deposit) {
            this.percentDeposit = prompt('Какой годовой процент?', '10');
            while(isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null) {
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            }

            this.moneyDeposit = prompt('Какая сумма заложена?', '10000');
            while(isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null) {
                this.moneyDeposit = prompt('Какая сумма заложена?', '10000');
            }

        }
    },
    calcSaveMoney: function () {
        return this.budgetMonth * periodSelect.value;
    },
    changeRange: function () {
        periodAmount.textContent = periodSelect.value;
    },
    reset: function () {
        document.querySelectorAll('input').forEach(function (item) {
            item.value = '';
        });
        periodSelect.value = 1;
        periodAmount.textContent = '1';

        document.querySelectorAll('.income-items').forEach(function (item, index) {
            if(index > 0) {
                item.remove();
            }
        });

        document.querySelectorAll('.expenses-items').forEach(function (item, index) {
            if(index > 0) {
                item.remove();
            }
        });

        cancelBtn.style.display = 'none';
        for(let i=0; i< document.querySelectorAll('.data input[type="text"]').length; i++) {
            document.querySelectorAll('.data input[type="text"]')[i].removeAttribute('disabled');
        }
        start.style.display = 'block';
        start.setAttribute('style', 'opacity: .3; pointer-events: none;');
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

let addDataStartBind = appData.start.bind(appData);

start.addEventListener('click', addDataStartBind);
cancelBtn.addEventListener('click', appData.reset);
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

//console.log('Уровень дохода: ' + appData.getStatusIncome());


