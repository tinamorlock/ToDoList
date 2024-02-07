const button = document.getElementById('enter');
const input = document.getElementById('userInput');
const categoryInput = document.getElementById('categoryInput');
const categorySelect = document.getElementById('categorySelect');
const ul = document.getElementById('toDoList');

function inputLength() {
    return input.value.length;
}

function createListElement(text, category) {
    const li = document.createElement('li');
    li.innerHTML = `<span class="task">${text}</span> <span class="category">${category}</span> <button class="delete">delete</button>`;
    ul.appendChild(li);
    li.addEventListener('click', toggleDone);
    li.querySelector('.delete').addEventListener('click', deleteItem);
    saveToLocalStorage();
}

function addListAfterClickOrKeypress(event) {
    if (inputLength() > 0 && (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter'))) {
        const selectedCategory = categoryInput.value || categorySelect.value; // Use the custom category if provided
        createListElement(input.value, selectedCategory);
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
    const items = Array.from(ul.children).map(item => {
        const text = item.querySelector('.task').textContent.trim();
        const category = item.querySelector('.category').textContent.trim();
        return { text, category };
    });
    localStorage.setItem('toDoListItems', JSON.stringify(items));
}

function loadFromLocalStorage() {
    const savedItems = localStorage.getItem('toDoListItems');
    if (savedItems) {
        const items = JSON.parse(savedItems);
        items.forEach(({ text, category }) => {
            createListElement(text, category);
        });
    }
}

// Event listener for the category input field
categoryInput.addEventListener('input', function () {
    updateCategoryOptions(categoryInput.value);
});

categoryInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addListAfterClickOrKeypress(event);
    }
});

function updateCategoryOptions(customCategory) {
    // Clear existing options
    categorySelect.innerHTML = '';

    // Add custom category if provided
    if (customCategory) {
        const customOption = document.createElement('option');
        customOption.value = customCategory;
        customOption.textContent = customCategory;
        categorySelect.appendChild(customOption);
    }

    // Add default options
    ['Personal', 'Work', 'Study'].forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        categorySelect.appendChild(option);
    });
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
