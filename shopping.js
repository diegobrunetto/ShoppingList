const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// Array to hold the state
const items = [];

// Listen for the submit event
function handlerSubmit(e){
  e.preventDefault();
  const name = e.currentTarget.item.value;

  const item = {
    name: name,
    id: Date.now,
    complete: false
  };

  // Push item to the state
  items.push(item);

  // Clear the form 
  e.target.reset();
}

function displayItems(){
  const html = items.map 
}

shoppingForm.addEventListener('submit', handlerSubmit);

// 15:30