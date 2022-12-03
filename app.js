import bank from "./bank.js";

// Work actions
const bankTotalElement = document.getElementById("bankTotal");
const workButtonElement = document.getElementById("btnWork");

const updateBankTotalElement = (newTotal) => {
    bankTotalElement.innerText = newTotal
}

const handleWorkButtonClicked = () => {
    bank.work()
    const newTotal = bank.getPaycheck()
    updateBankTotalElement(newTotal)
}

workButtonElement.addEventListener('click', handleWorkButtonClicked)

// Deposit to bank 
const balanceTotalElement = document.getElementById("BalanceTotal");
const bankDepositElement = document.getElementById("btnDeposit");

const updateBalanceTotalElement = (newBalance) => {
    balanceTotalElement.innerText = newBalance
}

const handleDepositButtonClicked = () => {
    bank.takeSalary()
    updateBalanceTotalElement(bank.getBankBalance())
    updateBankTotalElement(bank.getPaycheck())
    updateLoanTotalElement(bank.getOutstandingLoans())
}


bankDepositElement.addEventListener('click', handleDepositButtonClicked)



// Alt som har med shopping å gjøre 
const laptopsElement = document.getElementById("laptops");
const priceElement = document.getElementById("price");
const productNameElement = document.getElementById("productName")
const productDescriptionElement = document.getElementById("description")
const specsElement = document.getElementById("specs")
const productImg = document.getElementById("picture")

const baseUrl = 'https://computer-api-production.up.railway.app/'


//Storing content
let laptops = [];

//API Fetching
fetch("https://computer-api-production.up.railway.app/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptopsToDropdown(laptops));


const addLaptopsToDropdown = (laptops) => {
    laptops.forEach(x => addLaptopToDropdown(x));
    priceElement.innerText = laptops[0].price;
    productNameElement.innerText = laptops[0].title;
    productImg.src = baseUrl + laptops[0].image; 
    productDescriptionElement.innerText = laptops[0].description;
    createSpecList(laptops[0].specs, specsElement)
}

const addLaptopToDropdown = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id; 
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(laptopElement);
}

const createSpecList = (specs, specsElement) => {
    for(let i = 0; i < specs.length; i++) {
        const newListElement = document.createElement('li')
        newListElement.innerText = specs[i];
        specsElement.appendChild(newListElement);
    }
}
const handleDropdownChange = e => {
    const selectedLaptop = laptops[e.target.selectedIndex];
    priceElement.innerText = selectedLaptop.price;
    productNameElement.innerText = selectedLaptop.title;
    productDescriptionElement.innerText = selectedLaptop.description;
    productImg.src = baseUrl + selectedLaptop.image; 
    
    specsElement.innerHTML = ''
    createSpecList(selectedLaptop.specs, specsElement)


}

laptopsElement.addEventListener("change", handleDropdownChange);

// Applying for a loan
const loanButtonElement = document.getElementById("loanBtn");

const handleLoan = () => {
    const totalLoan = prompt("Please enter the amount of money you wish to loan:");

    if (totalLoan  >= bank.getBankBalance() * 2 && totalLoan != null) { 
        alert(`You got approved for a loan of ${totalLoan} NOK`);

        const change = parseFloat(totalLoan) + bank.getBankBalance();
        bank.takeLoan(parseFloat(totalLoan));
        console.log(change);

    } else {
        alert("You cant get a loan, the balance is too low balance or you did not enter a number");
    }


}
loanButtonElement.addEventListener("click", handleLoan);

// display outstanding loan
const loanTotalElement = document.getElementById("outstandingLoan");

const updateLoanTotalElement = (newLoanTotal) => {
    loanTotalElement.innerText = newLoanTotal;
}
const handleLoanButtonClicked = () => {
    const newLoanTotal = bank.getOutstandingLoans()
    updateLoanTotalElement(newLoanTotal);
}

loanButtonElement.addEventListener("click", handleLoanButtonClicked);

// Deposit to loan 
const outstandingLoanTotalElement = document.getElementById("outstandingLoan");
const loanDepositElement = document.getElementById("loanBtn");

const updateOutstandingLoanTotalElement = (newLoanBalance) => {
    outstandingLoanTotalElement.innerText = newLoanBalance
}

const handleLoanDepositButtonClicked = () => {
    bank.getOutstandingLoans()
    updateOutstandingLoanTotalElement(bank.getBankBalance())
}


loanDepositElement.addEventListener('click', handleLoanDepositButtonClicked)

