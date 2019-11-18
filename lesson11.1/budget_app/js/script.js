'use strict';

let start = document.getElementById('start'),
    cancelBtn = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositBank = document.querySelector('.deposit-bank'),
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

const AppData = function () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};


AppData.prototype.start = function () {
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
AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.getElementsByClassName('expenses-title')[0].value = '';
    cloneExpensesItem.getElementsByClassName('expenses-amount')[0].value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
        return;
    }
};
AppData.prototype.addIncomeBlock = function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.getElementsByClassName('income-title')[0].value = '';
    cloneIncomeItem.getElementsByClassName('income-amount')[0].value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3) {
        incomePlus.style.display = 'none';
        return;
    }
};

AppData.prototype.getExpInc = function () {
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


AppData.prototype.showResult = function () {
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
AppData.prototype.getAddExpenses = function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    const _this = this;
    addExpenses.forEach(function (item) {
        item = item.trim();
        if(item !== '') {
            _this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function () {
    const _this = this;
    additionalIncomeItems.forEach(function (item) {
        let itemValue = item.value.trim();
        if(itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    })
};
AppData.prototype.getExpensesMonth = function () {
    let sum = 0;

    for (let key in this.expenses)  {
        sum = sum + this.expenses[key]*1;
    }

    this.expensesMonth = sum;
    return sum;
};
AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.getExpensesMonth() + (this.moneyDeposit*this.percentDeposit)/12;
    this.budgetDay = Math.round(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function () {
    return (targetAmount.value/this.budgetMonth);
};
AppData.prototype.getStatusIncome = function () {
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
};
AppData.prototype.getInfoDeposit = function () {
    if(this.deposit){
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
    }
};
AppData.prototype.calcSaveMoney = function () {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.changeRange = function () {
    periodAmount.textContent = periodSelect.value;
};
AppData.prototype.reset = function () {
    window.location.reload();
};

AppData.prototype.eventsListeners = function () {
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
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);

    periodSelect.addEventListener('change', this.changeRange);

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
        console.log('appData.deposit: ', appData.deposit);
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