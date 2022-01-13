//Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkDelete);
filterOption.addEventListener('click', filterTodo);

//Functions
//a Function to add new todo
function addTodo(event){
    //Prevent Form from Submitting
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Check Mark Button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);
    //Trach Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //Append To List
    todoList.appendChild(todoDiv);
    //Save todo in local storage
    saveLocalTodos(todoInput.value); 
    //Clear Input Value
    todoInput.value = "";
}
//a Function to check or delete a todo
function checkDelete(e){
    //target todod div
    const item = e.target;
    //Delete Todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });

    }
    //Check todo
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('checked');
    }

}
//Filter Todo List
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;

            case "completed":
                if(todo.classList.contains('checked')){
                    todo.style.display="flex";
                }else{
                    todo.style.display="none";
                }
                break;
            
            case "uncompleted":
                if(todo.classList.contains('checked')){
                    todo.style.display="none";
                }else{
                    todo.style.display="flex";
                }
                break;
        }
    });
}
//Save todos in Local Storage
function saveLocalTodos(todo){
    //Check if there is already a todo list
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //push new todo in local storage
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
//Show previes todos
function getTodos(){
    //Check if there is already a todo list
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //show todos
    todos.forEach(function(todo){
       //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Check Mark Button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);
    //Trach Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //Append To List
    todoList.appendChild(todoDiv);
    });  
}
//Remove todo from local storage
function removeLocalTodos(todo){
    //Check if there is already a todo list
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    //set back todos list in localstorage
    localStorage.setItem('todos', JSON.stringify(todos));
}