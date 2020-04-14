const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// Array to hold the state
let items = [];

// Listen for the submit event
function handlerSubmit(e) {
  e.preventDefault();
  const name = e.currentTarget.item.value;

  const item = {
    name,
    id: Date.now(),
    complete: false,
  };

  // Push item to the state
  items.push(item);

  // Clear the form
  e.target.reset();

  // Fire off a custom event
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

// Display the items
function displayItems() {
  const html = items
    .map(
      item =>
        `<li class = "shopping-item">
      <input value="${item.id}" type="checkbox" 
      ${item.complete ? 'checked' : ''} class="check">
      <span class="itemName"> ${item.name} </span>
      <button value="${item.id}"> &times </button>
      </li>`
    )
    .join('');

  list.innerHTML = html;
}

// Add the items to LS
function mirrorToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
}

// Take the items from LS
function restoreFromLocalStorage() {
  const lsItems = JSON.parse(localStorage.getItem('items'));

  if (lsItems.length) {
    lsItems.forEach(item => items.push(item));
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

// Delete items from the list
function deleteItem(id) {
  items = items.filter(item => item.id !== id);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

// Mark as complete the selected item
function markAsComplete(id) {
  const itemRef = items.find(item => item.id === id);
  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', handlerSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);

// Event delegation from the list to the button and the input
list.addEventListener('click', function(e) {
  const id = parseInt(e.target.value);
  if (e.target.matches('button')) {
    deleteItem(id);
  }
  if (e.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
});

restoreFromLocalStorage();

// 38.30
