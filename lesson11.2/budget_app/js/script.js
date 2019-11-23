'use strict';

const start = document.getElementById('start'),
    cancelBtn = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositBank = document.querySelector('.deposit-bank'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount');

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');

class AppData {
    constructor (
        budget = 0,
        budgetDay = 0,
        budgetMonth = 0,
        expensesMonth = 0,
        income = {},
        incomeMonth = 0,
        addIncome = [],
        expenses = {},
        addExpenses = [],
        deposit = false,
        percentDeposit = 0,
        moneyDeposit = 0
    ) {
        this.budget = budget;
        this.budgetDay = budgetDay;
        this.budgetMonth = budgetMonth;
        this.expensesMonth = expensesMonth;
        this.income = income;
        this.incomeMonth = incomeMonth;
        this.addIncome = addIncome;
        this.expenses = expenses;
        this.addExpenses = addExpenses;
        this.deposit = deposit;
        this.percentDeposit = percentDeposit;
        this.moneyDeposit = moneyDeposit;
    }

    start = function () {
        this.budget = +salaryAmount.value;
        this.getExpInc();
        this.getAddExpenses();
        this.getAddIncome();

        this.getInfoDeposit();
        this.getBudget();
        this.showResult();

        start.style.display = 'none';
        for(let i=0; i< document.querySelectorAll('.data input[type="text"]').length; i++) {
            document.querySelectorAll('.data input[type="text"]')[i].setAttribute('disabled', 'disabled');
        }
        cancelBtn.style.display = 'block';
    };


    addBlock = function (type) {
        let cloneItems = document.querySelectorAll(`.${type}-items`);
        const btnElem = document.querySelectorAll(`.${type}_add`);

        const cloneItem = cloneItems[0].cloneNode(true);
        cloneItem.getElementsByClassName(`${type}-title`)[0].value = '';
        cloneItem.getElementsByClassName(`${type}-amount`)[0].value = '';
        cloneItems[0].parentNode.insertBefore(cloneItem, btnElem[0]);
        cloneItems = document.querySelectorAll(`.${type}-items`);
        if(type === 'expenses') {
            expensesItems = document.querySelectorAll(`.${type}-items`);
        } else {
            incomeItems = document.querySelectorAll(`.${type}-items`);
        }

        if(cloneItems.length === 3) {
            btnElem[0].style.display = 'none';
            return;
        }
    };

    getExpInc = function () {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if(itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }
        };

        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for (const key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    };

    showResult = function () {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSaveMoney();

        periodSelect.addEventListener('change', function () {
            incomePeriodValue.value = _this.calcSaveMoney();
        });
    };

    getAddExpenses = function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        const _this = this;
        addExpenses.forEach(function (item) {
            item = item.trim();
            if(item !== '') {
                _this.addExpenses.push(item);
            }
        });
    };
    getAddIncome = function () {
        const _this = this;
        additionalIncomeItems.forEach(function (item) {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        })
    };

    getExpensesMonth = function () {
        let sum = 0;

        for (let key in this.expenses)  {
            sum = sum + this.expenses[key]*1;
        }

        this.expensesMonth = sum;
        return sum;
    };
    getBudget = function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.getExpensesMonth() + (this.moneyDeposit*this.percentDeposit)/12;
        this.budgetDay = Math.round(this.budgetMonth / 30);
    };
    getTargetMonth = function () {
        return (targetAmount.value/this.budgetMonth);
    };

    getInfoDeposit = function () {
        if(this.deposit){
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    };
    calcSaveMoney = function () {
        return this.budgetMonth * periodSelect.value;
    };
    changeRange = function () {
        periodAmount.textContent = periodSelect.value;
    };
    reset = function () {
        window.location.reload();
    };
    eventsListeners = function () {
        salaryAmount.addEventListener('change', function () {
            if(salaryAmount.value !== '') {
                start.removeAttribute('style');
            } else {
                start.setAttribute('style', 'opacity: .3; pointer-events: none;');
            }
        });

        let addDataStartBind = this.start.bind(this);

        start.addEventListener('click', addDataStartBind);

        cancelBtn.addEventListener('click', this.reset);
        expensesPlus.addEventListener('click', () => {
            this.addBlock('expenses');
        });
        incomePlus.addEventListener('click', () => {
            this.addBlock('income');
        });

        periodSelect.addEventListener('change', this.changeRange);

    };
};

const appData = new AppData();

appData.eventsListeners();

depositCheck.addEventListener('change', function() {
    if(depositCheck.checked) {
        depositBank.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        depositPercent.removeAttribute('disabled');
        appData.deposit = true;

        depositBank.addEventListener('change', function() {
            const selectIndex = this.options[this.selectedIndex].value;
            if (selectIndex == 'other') {
                depositPercent.style.display = 'inline-block';
                depositPercent.value = '';
            } else {
                depositPercent.style.display = 'none';
                depositPercent.value = selectIndex;
            }
        });
    } else {
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositAmount.value = '';
        appData.deposit = false;
        //console.log('appData.deposit: ', appData.deposit);
    }
});

start.setAttribute('style', 'opacity: .3; pointer-events: none;');

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