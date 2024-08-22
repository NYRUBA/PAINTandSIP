//LOCAL STORAGR ALLOWS YOU TO SAVE DATA IN THE BROWSER SO IT REMAINS EVEN A PAGE REFRESH //

let inventory = [];
let sales = [];

// Function to save inventory and sales data to localStorage
function saveData() {
    localStorage.setItem('inventory', JSON.stringify(inventory));
    localStorage.setItem('sales', JSON.stringify(sales));
}

// Function to load inventory and sales data from localStorage
function loadData() {
    const storedInventory = localStorage.getItem('inventory');
    const storedSales = localStorage.getItem('sales');

    if (storedInventory) {
        inventory = JSON.parse(storedInventory);
    }
    if (storedSales) {
        sales = JSON.parse(storedSales);
    }

    displayInventory();
    displaySalesLog();
}

// Run loadData when the page loads to retrieve saved data
window.onload = loadData;

// Function to add an item to the inventory
function addItem() {
    const name = document.getElementById('itemName').value;
    const quantity = parseInt(document.getElementById('itemQuantity').value);
    const price = parseFloat(document.getElementById('itemPrice').value);

    if (name && quantity > 0 && price > 0) {
        inventory.push({ name, quantity, price });
        document.getElementById('itemForm').reset(); // Clear form fields
        displayInventory();
        saveData(); // Save data to localStorage
    }
}

// Function to display the inventory list
function displayInventory() {
    const inventoryList = document.getElementById('inventoryList');
    inventoryList.innerHTML = '';
    
    inventory.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - Quantity: ${item.quantity} - Price: UGX ${item.price.toFixed(2)}`;

        const sellButton = document.createElement('button');
        sellButton.textContent = 'Sell';
        sellButton.addEventListener('click', () => sellItem(index));
        
        listItem.appendChild(sellButton);
        inventoryList.appendChild(listItem);
    });
}

// Function to handle item selling
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
        saveData(); // Save data to localStorage
    } else {
        alert('Out of stock!');
    }
}

// Function to display the sales log
function displaySalesLog() {
    const salesLog = document.getElementById('salesLog');
    salesLog.innerHTML = '';
    
    sales.forEach(sale => {
        const logItem = document.createElement('li');
        logItem.textContent = `Sold: ${sale.name} - Price: UGX ${sale.price.toFixed(2)} - Date: ${sale.date}`;
        salesLog.appendChild(logItem);
    });
}

//STEP TWO
// ALERTS USERS WHEN INVENTORT LEVELS ARE BELOW A CERTAIN THRESHOLD //

function displayInventory() {
    const inventoryList = document.getElementById('inventoryList');
    inventoryList.innerHTML = '';

    inventory.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - Quantity: ${item.quantity} - Price: UGX ${item.price.toFixed(2)}`;

        // Check if stock is low
        if (item.quantity < 5) {
            listItem.style.color = 'red';
            listItem.textContent += ' (Low Stock!)';
        }

        const sellButton = document.createElement('button');
        sellButton.textContent = 'Sell';
        sellButton.addEventListener('click', () => sellItem(index));
        listItem.appendChild(sellButton);

        inventoryList.appendChild(listItem);
    });
}
