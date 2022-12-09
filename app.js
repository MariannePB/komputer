import bank from "./bank.js";

const updateElementContent = (elementId, content) => {
    const element = document.getElementById(elementId);
    element.innerText = content();
}

// Work actions

const workButton = document.getElementById("btnWork");
btnWork.addEventListener("click", () => {
        bank.work();
        updateElementContent("earnings", bank.getPaycheck);
    }
);


// Deposit to bank 

const depositButton = document.getElementById("btnDeposit");
depositButton.addEventListener("click", () => {
    bank.takeSalary()
    updateElementContent("BalanceTotal", bank.getBankBalance);
    updateElementContent("earnings", bank.getPaycheck);
    updateElementContent("outstandingLoan", bank.getOutstandingLoans);
});

const updateLoanStatus = () => {
    let hasLoan = bank.getOutstandingLoans() > 0;
    document.getElementById("outstandingLoan").hidden = !hasLoan; 
    document.getElementById("outstandingLoanLabel").hidden = !hasLoan;
    document.getElementById("btnDepositAllToLoan").hidden = !hasLoan;
}

// Deposit to loan

const depositToLoanButton = document.getElementById("btnDepositAllToLoan");
depositToLoanButton.addEventListener("click", () => {
    bank.repay();
    updateElementContent("outstandingLoan", bank.getOutstandingLoans);
    updateElementContent("earnings", bank.getPaycheck);
    updateElementContent("BalanceTotal", bank.getBankBalance);
    updateLoanStatus()
});

// Applying for a loan

const loanButton = document.getElementById("loanBtn");

loanButton.addEventListener("click", () => {
    const res = bank.takeLoan(
        parseFloat(prompt("Please enter the amount of money you wish to loan:"))
    );
    if (res == false) {
        alert("You cant get a loan, the balance is too low balance, you already have a loan, or you did not enter a number");
        updateLoanStatus()
    } else {
        alert("You got approved for a loan");
        updateElementContent("outstandingLoan", bank.getOutstandingLoans);
        updateElementContent("BalanceTotal", bank.getBankBalance);
        updateLoanStatus()

    }
});


// Alt som har med shopping å gjøre 
const laptopsElement = document.getElementById("laptops");
const priceElement = document.getElementById("price");
const productNameElement = document.getElementById("productName");
const productDescriptionElement = document.getElementById("description");
const productStockElement = document.getElementById("stock");
const specsElement = document.getElementById("specs");
const productImg = document.getElementById("picture");
const buyBtn = document.getElementById("buyLaptopBtn");

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
    productStockElement.innerText = laptops[0].stock;
    createSpecList(laptops[0].specs, specsElement);
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
    productStockElement.innerText = selectedLaptop.stock;
    productImg.src = baseUrl + selectedLaptop.image; 
    
    specsElement.innerHTML = ''
    createSpecList(selectedLaptop.specs, specsElement)
}
laptopsElement.addEventListener("change", handleDropdownChange);

const handleBuyLaptop = () => {
    const selectedLaptop = laptops[laptopsElement.selectedIndex];
    const res = bank.buy(selectedLaptop.price);
    if (!res) {
        alert("You cant buy this laptop, the balance is too low");
    } else {
        alert("You bought the laptop");
    }
    updateElementContent("BalanceTotal", bank.getBankBalance);
}

buyBtn.addEventListener("click", handleBuyLaptop);


