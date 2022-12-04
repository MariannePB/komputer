let paycheck = 0
const earnings = 100
let bankBalance = 0 // should always be raw balance, no loans
let outstandingLoans = 0

// Arbeide, altså få penger på konto
const work = () =>{
    paycheck += earnings
}

const changeBankBalance = (modifier) =>{
    bankBalance += modifier
}

const getBankBalance = () => {
    return bankBalance + outstandingLoans
}

//update state on screen and the code after working
const getPaycheck = () => {
    return paycheck
}

// denne må skrives om, slik at jeg ikke "kjøper" noe her men setter pengene inn i banken
const buy = (price) => {
    if (price < getBankBalance()) {
        bankBalance -= price;
        return true;
    } else {
        return false;
    }
    
}

// repay loans
const repay = () =>{
    if (outstandingLoans >= paycheck) {
        outstandingLoans -= paycheck;
        bankBalance += paycheck;
        paycheck = 0;
    } else {
        paycheck -= outstandingLoans;
        bankBalance += outstandingLoans;
        outstandingLoans = 0;
    }
}

//update state on screen for loan
const getOutstandingLoans = () => {
    return outstandingLoans
}
const takeLoan =(amount) => {
    if (amount == "" || isNaN(amount) || outstandingLoans > 0 || amount > bankBalance * 2) {
        return false;
    }
    outstandingLoans += amount;
    return true;
}

const takeSalary = () => {
    if (outstandingLoans == 0) {
        bankBalance += paycheck;
        paycheck = 0;
        // paycheck not updated in UI
    } else {
        const loanPayment = paycheck / 10;
        if (outstandingLoans < loanPayment) {
            const salaryToPay = paycheck;
            outstandingLoans = 0; 
            changeBankBalance(salaryToPay);
            paycheck = 0;
        } else {
            changeBankBalance(paycheck);
            outstandingLoans -= loanPayment;
            paycheck = 0;
        }
    }
}

const bank = {
    work,
    changeBankBalance,
    getBankBalance,
    getPaycheck,
    buy,
    getOutstandingLoans,
    takeLoan,
    takeSalary,
    repay
}


export default bank