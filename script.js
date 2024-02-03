const button = document.getElementById('enter');
const input = document.getElementById('userInput');
const ul = document.getElementById('toDoList');

function inputLength() {
    return input.value.length;
}

function createListElement(text) {
    const li = document.createElement('li');
    li.innerHTML = `${text} <button class="delete">delete</button>`;
    ul.appendChild(li);
    li.addEventListener('click', toggleDone);
    li.querySelector('.delete').addEventListener('click', deleteItem);
    saveToLocalStorage();
}

function addListAfterClickOrKeypress(event) {
    if (inputLength() > 0 && (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter'))) {
        createListElement(input.value);
        input.value = '';
    }
}

function toggleDone() {
    this.classList.toggle('done');
    saveToLocalStorage();
}

function deleteItem(event) {
    event.stopPropagation();
    const listItem = this.closest('li');
    if (listItem) {
        listItem.remove();
        saveToLocalStorage();
    }
}

function saveToLocalStorage() {
    const items = Array.from(ul.children).map(item => item.firstChild.textContent.trim());
    localStorage.setItem('toDoListItems', JSON.stringify(items));
}

function loadFromLocalStorage() {
    const savedItems = localStorage.getItem('toDoListItems');
    if (savedItems) {
        const items = JSON.parse(savedItems);
        items.forEach(item => createListElement(item));
    }
}

ul.addEventListener('click', function (event) {
    if (event.target.tagName === 'li') {
        toggleDone.call(event.target);
    }
    if (event.target.classList.contains('delete')) {
        deleteItem.call(event.target);
    }
});

button.addEventListener('click', addListAfterClickOrKeypress);
input.addEventListener('keydown', addListAfterClickOrKeypress);

// Load items from local storage on page load
loadFromLocalStorage();