// Дебетовый счет
var DebitAccount = /** @class */ (function () {
    function DebitAccount(accountNumber, initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }
    DebitAccount.prototype.deposit = function (amount) {
        this.balance += amount;
        console.log("\u0414\u0435\u043F\u043E\u0437\u0438\u0442: ".concat(amount, " \u043D\u0430 \u0441\u0447\u0435\u0442 ").concat(this.accountNumber, ". \u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0431\u0430\u043B\u0430\u043D\u0441: ").concat(this.balance));
    };
    DebitAccount.prototype.withdraw = function (amount) {
        if (amount > this.balance) {
            console.log("\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0441\u0440\u0435\u0434\u0441\u0442\u0432 \u043D\u0430 \u0441\u0447\u0435\u0442\u0435 ".concat(this.accountNumber, ". \u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0431\u0430\u043B\u0430\u043D\u0441: ").concat(this.balance));
        }
        else {
            this.balance -= amount;
            console.log("\u0421\u043D\u044F\u0442\u0438\u0435: ".concat(amount, " \u0441 \u0441\u0447\u0435\u0442\u0430 ").concat(this.accountNumber, ". \u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0431\u0430\u043B\u0430\u043D\u0441: ").concat(this.balance));
        }
    };
    DebitAccount.prototype.checkBalance = function () {
        console.log("\u0411\u0430\u043B\u0430\u043D\u0441 \u0441\u0447\u0435\u0442\u0430 ".concat(this.accountNumber, ": ").concat(this.balance));
    };
    return DebitAccount;
}());
// Кредитный счет
var CreditAccount = /** @class */ (function () {
    function CreditAccount(accountNumber, creditLimit) {
        this.accountNumber = accountNumber;
        this.balance = 0;
        this.creditLimit = creditLimit;
        this.debt = 0;
    }
    CreditAccount.prototype.deposit = function (amount) {
        if (this.debt > 0) {
            var paymentToDebt = Math.min(amount, this.debt);
            this.debt -= paymentToDebt;
            amount -= paymentToDebt;
            console.log("\u041F\u043E\u0433\u0430\u0448\u0435\u043D\u0438\u0435 \u0434\u043E\u043B\u0433\u0430: ".concat(paymentToDebt, ". \u041E\u0441\u0442\u0430\u0442\u043E\u043A \u0434\u043E\u043B\u0433\u0430: ").concat(this.debt));
        }
        if (amount > 0) {
            this.balance += amount;
            console.log("\u0414\u0435\u043F\u043E\u0437\u0438\u0442: ".concat(amount, " \u043D\u0430 \u0441\u0447\u0435\u0442 ").concat(this.accountNumber, ". \u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0431\u0430\u043B\u0430\u043D\u0441: ").concat(this.balance));
        }
    };
    CreditAccount.prototype.withdraw = function (amount) {
        var availableFunds = this.balance + this.creditLimit - this.debt;
        if (amount > availableFunds) {
            console.log("\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0441\u0440\u0435\u0434\u0441\u0442\u0432 \u043D\u0430 \u0441\u0447\u0435\u0442\u0435 ".concat(this.accountNumber, ". \u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u0434\u043B\u044F \u0441\u043D\u044F\u0442\u0438\u044F: ").concat(availableFunds));
        }
        else if (amount > this.balance) {
            var overdraft = amount - this.balance;
            this.debt += overdraft;
            this.balance = 0;
            console.log("\u0421\u043D\u044F\u0442\u0438\u0435: ".concat(amount, " \u0441 \u0441\u0447\u0435\u0442\u0430 ").concat(this.accountNumber, " \u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C \u043A\u0440\u0435\u0434\u0438\u0442\u0430. \u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0434\u043E\u043B\u0433: ").concat(this.debt));
        }
        else {
            this.balance -= amount;
            console.log("\u0421\u043D\u044F\u0442\u0438\u0435: ".concat(amount, " \u0441 \u0441\u0447\u0435\u0442\u0430 ").concat(this.accountNumber, ". \u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0431\u0430\u043B\u0430\u043D\u0441: ").concat(this.balance));
        }
    };
    CreditAccount.prototype.checkBalance = function () {
        console.log("\u0411\u0430\u043B\u0430\u043D\u0441 \u0441\u0447\u0435\u0442\u0430 ".concat(this.accountNumber, ": ").concat(this.balance, ". \u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0434\u043E\u043B\u0433: ").concat(this.debt));
    };
    return CreditAccount;
}());
// Демонстрация работы системы
// Создаем дебетовый счет
var debitAccount = new DebitAccount("1111-1111-debit", 500);
debitAccount.checkBalance();
debitAccount.deposit(200);
debitAccount.withdraw(100);
debitAccount.withdraw(700);
debitAccount.checkBalance();
// Создаем кредитный счет
var creditAccount = new CreditAccount("1212-1212-credit", 1000);
creditAccount.checkBalance();
creditAccount.deposit(300);
creditAccount.withdraw(500);
creditAccount.withdraw(1000);
creditAccount.deposit(200);
creditAccount.checkBalance();
