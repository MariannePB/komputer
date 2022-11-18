const laptopsElement = document.getElementById("laptops");
const priceElement = document.getElementById("price");
const productNameElement = document.getElementById("productName")
const productDescriptionElement = document.getElementById("description")
const specsElement = document.getElementById("specs")
const productImg = document.getElementById("picture")

const baseUrl = 'https://noroff-komputer-store-api.herokuapp.com/'


//Storing content
let laptops = [];

//API Fetching
fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
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