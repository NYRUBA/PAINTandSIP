const inventory = [];
const sales = [];
const stockRequests =[];

document.getElementById('requestStockBtn').addEventListener('click', requestStock);

//Save inventory and sales data to local storage
function saveData() {
    localStorage.setItem('inventory', JSON.stringify(inventory));
    localStorage.setItem('sales', JSON.stringify(sales));
}

// Load inventory and sales data from localStorage
function loadData() {
    const storedInventory = localStorage.getItem('inventory');
    const storedSales = localStorage.getItem('sales');

    if (storedInventory) {
        inventory.push(...JSON.parse(storedInventory));
    }
    if (storedSales) {
        sales.push(...JSON.parse(storedSales));
    }

    displayInventory();
    displaySalesLog();
    updateDashboard();
}

// Run loadData, GenerateSalesReport and updateDashboard when the page loads to retrieve saved data
window.onload = function(){
    loadData();
    generateSalesReport();
    updateDashboard();
};



function displayInventory() {
    const inventoryList = document.getElementById('inventoryList');
    inventoryList.innerHTML = '';

    inventory.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Item name: ${item.name} - Quantity: ${item.quantity} - Price: UGX ${item.price.toFixed(2)}`;

// Check if stock is low
        if (item.quantity < 5) {
            listItem.style.color = 'red';
            listItem.textContent += ' (Request Stock!)';
        }

        const sellButton = document.createElement('button');
        sellButton.textContent = 'Sell';
        sellButton.addEventListener('click', () => sellItem(index));
        listItem.appendChild(sellButton);

        inventoryList.appendChild(listItem);
    });
}



function sellItem(index) {
    if (inventory[index].quantity > 0) {
        inventory[index].quantity -= 1;
        sales.push({
            name: inventory[index].name,
            price: inventory[index].price,
            date: new Date().toLocaleString()
        });
        displayInventory();
        displaySalesLog();
        saveData();
        generateSalesReport();
        updateDashboard();
    } else {
        alert('Out of stock!');
    }
    
}

function displaySalesLog() {
    const salesLog = document.getElementById('salesLog');
    salesLog.innerHTML = '';

    sales.forEach(sale => {
        const logItem = document.createElement('li');
        logItem.textContent = `Sold: ${sale.name} - Price: UGX ${sale.price.toFixed(2)} - Date: ${sale.date}`;
        salesLog.appendChild(logItem);
    });
}

function requestStock() {
    const name = document.getElementById('itemName').value.trim;
    const quantity = parseInt(document.getElementById('itemQuantity').value);
    

   // Input validation
   if (!name) {
    alert('Item name is required.');
    return;
}
if (isNaN(quantity) || quantity <= 0) {
    alert('Quantity must be a positive number.');
    return;
}

    const currentRequests = JSON.parse(localStorage.getItem('stockRequests')) || [];
    currentRequests.push(stockRequest);

    // Save the updated stock request (this could be sent to admin)
    localStorage.setItem('stockRequests', JSON.stringify(currentRequests));
    alert(`Stock request for ${itemName} submitted.`);
}
