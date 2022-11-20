let paycheck = 0
const earnings = 500
let bankBalance = 0


// Arbeide, altså få penger på konto
const work = () =>{
    paycheck += earnings
}

const changeBankBalance = () =>{
    bankBalance += paycheck
    paycheck = 0
}

const getBankBalance = () => {
    return bankBalance
}

//update state on screen and the code after working
const getPaycheck = () => {
    return paycheck
}

// denne må skrives om, slik at jeg ikke "kjøper" noe her men setter pengene inn i banken
const buy = (price) => {
    bankBalance -= price
}

const bank = {
    work,
    changeBankBalance,
    getBankBalance,
    getPaycheck,
    buy
}


export default bank