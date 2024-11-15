// Интерфейс банковского счета
interface Account {
    accountNumber: string;
    balance: number;

    deposit(amount: number): void;
    withdraw(amount: number): void;
    checkBalance(): void;
}

// Дебетовый счет
class DebitAccount implements Account {
    accountNumber: string;
    balance: number;

    constructor(accountNumber: string, initialBalance: number) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    deposit(amount: number): void {
        this.balance += amount;
        console.log(`Депозит: ${amount} на счет ${this.accountNumber}. Текущий баланс: ${this.balance}`);
    }

    withdraw(amount: number): void {
        if (amount > this.balance) {
            console.log(`Недостаточно средств на счете ${this.accountNumber}. Текущий баланс: ${this.balance}`);
        } else {
            this.balance -= amount;
            console.log(`Снятие: ${amount} с счета ${this.accountNumber}. Текущий баланс: ${this.balance}`);
        }
    }

    checkBalance(): void {
        console.log(`Баланс счета ${this.accountNumber}: ${this.balance}`);
    }
}

// Кредитный счет
class CreditAccount implements Account {
    accountNumber: string;
    balance: number;
    creditLimit: number;
    debt: number;

    constructor(accountNumber: string, creditLimit: number) {
        this.accountNumber = accountNumber;
        this.balance = 0;
        this.creditLimit = creditLimit;
        this.debt = 0;
    }

    deposit(amount: number): void {
        if (this.debt > 0) {
            const paymentToDebt = Math.min(amount, this.debt);
            this.debt -= paymentToDebt;
            amount -= paymentToDebt;
            console.log(`Погашение долга: ${paymentToDebt}. Остаток долга: ${this.debt}`);
        }
        if (amount > 0) {
            this.balance += amount;
            console.log(`Депозит: ${amount} на счет ${this.accountNumber}. Текущий баланс: ${this.balance}`);
        }
    }

    withdraw(amount: number): void {
        const availableFunds = this.balance + this.creditLimit - this.debt;
        if (amount > availableFunds) {
            console.log(`Недостаточно средств на счете ${this.accountNumber}. Доступно для снятия: ${availableFunds}`);
        } else if (amount > this.balance) {
            const overdraft = amount - this.balance;
            this.debt += overdraft;
            this.balance = 0;
            console.log(`Снятие: ${amount} с счета ${this.accountNumber} с использованием кредита. Текущий долг: ${this.debt}`);
        } else {
            this.balance -= amount;
            console.log(`Снятие: ${amount} с счета ${this.accountNumber}. Текущий баланс: ${this.balance}`);
        }
    }

    checkBalance(): void {
        console.log(`Баланс счета ${this.accountNumber}: ${this.balance}. Текущий долг: ${this.debt}`);
    }
}

// Демонстрация работы системы
const debitAccount = new DebitAccount("1111-1111-debit", 500);
debitAccount.checkBalance();
debitAccount.deposit(200);
debitAccount.withdraw(100);
debitAccount.withdraw(700);
debitAccount.checkBalance();

const creditAccount = new CreditAccount("1212-1212-credit", 1000);
creditAccount.checkBalance();
creditAccount.deposit(300);
creditAccount.withdraw(500);
creditAccount.withdraw(1000);
creditAccount.deposit(200);
creditAccount.checkBalance();
