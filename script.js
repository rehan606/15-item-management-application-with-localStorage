
let serial = 1;
const additem = () => {
    // Get input Fields
    const itemField = document.getElementById('item-name')
    const quantityField = document.getElementById('item-quantity')

    // get input value
    const items = itemField.value;
    const quantity = parseInt(quantityField.value)

    // Clear Form 
    itemField.value = "";
    quantityField.value = "";

    displayItems(items , quantity)
    saveItemsInLocalStorage(items, quantity)
}

// Display input items
const displayItems = (items, quantity) => {
    
    const itemContainer = document.getElementById('items-container')
    
    const div = document.createElement('div')
    div.innerHTML = `
        <div class="flex justify-between items-center py-3 border-b border-green-100 hover:bg-green-200 px-4">
                <p class="text-md font-semibold w-1/12">${serial}</p>
                <p class="text-md font-semibold w-5/12">${items}</p>
                <p class="text-md font-semibold w-4/12">${quantity}</p>
                <p class="text-md font-semibold w-2/12 text-right"><button class="btn btn-error delete-btn"><i class="fa-regular fa-trash-can text-white"></i></button></p>
        </div>

    `
    // Add delete functionality
    const deleteButton = div.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
        deleteItem(items, div);
    });

    // 
    itemContainer.appendChild(div)
    serial++;

}

// Delete Item from DOM and Local Storage
const deleteItem = (itemName, itemElement) => {
    // Remove item from the DOM
    itemElement.remove();
    
    // Remove item from Local Storage
    const items = getStoreItems();
    delete items[itemName];
    localStorage.setItem('items', JSON.stringify(items));
}


// Local Storage

const getStoreItems = () => {
    let items = {};
    const itemsCart = localStorage.getItem('items')
    if(itemsCart){
        items = JSON.parse(itemsCart);
    }
    return items;
}

// Save items in LocalStorage
const saveItemsInLocalStorage = (items, quantity) => {
    const item = getStoreItems();
    item[items] = quantity;
    const stringifyed = JSON.stringify(item);
    localStorage.setItem('items', stringifyed)
}

// Display Data from Local storage

const localStorageDataDisplay = () => {
    const saveItems = getStoreItems();
    for (const item in saveItems){
        const quantity = saveItems[item];
        displayItems(item, quantity)
    }

}
localStorageDataDisplay()