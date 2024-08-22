const inventory =[];
const sales =[];

document.getElementById('addItemBtn').addEventListener('click',addItem);

function addItem() {
    const name = document.getElementById('itemName').value;
    const quantity = parseInt(document.getElementById('itemQuantity').value);
    const price = parseFloat(document.getElementById('itemPrice').value);

    if (name && quantity > 0 && price > 0) {
        inventory.push({ name, quantity, price });
        displayInventory();
    }
}

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