const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const addTask = () => {
    if (inputBox.value === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        // Create Delete button
        let delBtn = document.createElement('span');
        delBtn.innerHTML = "\u00d7"; // × symbol
        delBtn.classList.add('delete-btn');

        // Create Edit button
        let editBtn = document.createElement('span');
        editBtn.innerHTML = "\u270E"; // ✎ symbol
        editBtn.classList.add('edit-btn');

        li.appendChild(delBtn);
        li.appendChild(editBtn);
        listContainer.appendChild(li);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.classList.contains("edit-btn")) { // check edit first
        let li = e.target.parentElement;
        // The task text is li.childNodes[0] because firstChild may include text nodes or spaces
        let taskText = li.childNodes[0].textContent; 
        let newText = prompt("Edit your task:", taskText);
        if (newText !== null && newText.trim() !== "") {
            li.childNodes[0].textContent = newText;
            saveData();
        }
    }
    else if (e.target.classList.contains("delete-btn")) { // then delete
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();