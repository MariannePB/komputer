let paycheck = 0
const earnings = 100
let bankBalance = 0
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
    bankBalance -= price
}

/* // repay loans
const repay = () =>{
    0 + outstandingLoans
}
*/
//update state on screen for loan
const getOutstandingLoans = () => {
    return outstandingLoans
}
const takeLoan =(amount) => {
    console.log(`taking loan of ${amount}`)
    outstandingLoans += amount;
}

const takeSalary = () => {
    console.log(outstandingLoans)
    if (outstandingLoans == 0) {
        bankBalance += paycheck;
        paycheck = 0;
        // paycheck not updated in UI
    } else {
        const loanPayment = paycheck / 10;
        if (outstandingLoans < loanPayment) {
            console.log(`this is the loanPayment:${loanPayment}`)
            const salaryToPay = paycheck;
            outstandingLoans = 0; 
            changeBankBalance(salaryToPay);
            paycheck = 0;
        } else {
            console.log(`this is the paycheck:${paycheck}`)
            changeBankBalance(paycheck);
            outstandingLoans -= loanPayment;
            paycheck = 0;
        }
    }
    console.log(`Outstanding ${outstandingLoans}, balance ${getBankBalance()}`)
}

const bank = {
    work,
    changeBankBalance,
    getBankBalance,
    getPaycheck,
    buy,
    getOutstandingLoans,
    takeLoan,
    takeSalary
}


export default bank