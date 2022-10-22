// Değişkenleri tanımlama
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.getElementById("filter");
const clearButton = document.querySelector("#clear-todos");

// Event listenerları çağırdığımız fonksiyon
eventListeners();
function eventListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
};
function deleteTodo(e){
    if (e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo başarıyla kaldırıldı.");
        clearButton.addEventListener("click",clearAllTodos);
    }

}
function clearAllTodos(){
    if (confirm("Tümünü silmek istediğinize emin misiniz ? ")){
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(li => {
        const text = li.textContent.toLowerCase();
        if (text.indexOf(filterValue)===-1){
            li.setAttribute("style","display : none !important");
        }
        else {
            li.setAttribute("style","display : block");
        }
    });

}
function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage(); // todos arrayimizi aldık
    todos.forEach(function(todo,index){
        if(todo===deletetodo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(element => {
        addTodoToUI(element);
    });
}
function addTodo(e){
    const newTodo = todoInput.value.trim();
    const todos = getTodosFromStorage();
    let sameTodo = false;
    todos.forEach(todo => {
        if (todo === newTodo){
            sameTodo = true;
            return sameTodo;
        }
    });
    if (newTodo ===""){
        showAlert("danger","Lütfen bir todo girin...");
    }
    else if(sameTodo === true){
        showAlert("danger","Todo halihazırda var.");

    }

    
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);

        showAlert("success","Giriş başarılı.");
    }
    
    e.preventDefault();
    
}

function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    setTimeout(function(){
        alert.remove();
    },1500);
}
function getTodosFromStorage(){
    let todos;
    if (localStorage.getItem("todos") ===null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));

}
function addTodoToUI(newTodo){
    // list item oluşturma
    const listItem = document.createElement("li");
    // link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    
    listItem.className = "list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link)
    
    todoList.appendChild(listItem);
    todoInput.value ="";
}






