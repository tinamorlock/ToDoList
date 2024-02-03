const button = document.getElementById('enter');
const input = document.getElementById('userInput');
const ul = document.querySelector('ul');

function inputLength() {
    return input.value.length;
}

function createListElement() {
    const li = document.createElement('li');
    li.innerHTML = `${input.value} <button class="delete">X</button>`;
    ul.appendChild(li);
    input.value = '';
    li.addEventListener('click', toggleDone);
    li.querySelector('.delete').addEventListener('click', deleteItem);
}

function addListAfterClickOrKeypress(event) {
    if (inputLength() > 0 && (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter'))) {
        createListElement();
    }
}

function toggleDone() {
    this.classList.toggle('done');
}

function deleteItem(event) {
    const listItem = this.closest('li');
    if (listItem) {
        listItem.remove();
    }
}

ul.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
        toggleDone.call(event.target);
    }
});

ul.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
        deleteItem.call(event.target);
    }
});

button.addEventListener('click', addListAfterClickOrKeypress);
input.addEventListener('keydown', addListAfterClickOrKeypress);