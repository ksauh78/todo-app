const todoInput = document.querySelector("#todo-input");
const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector("#todo-list");
let todos = [];
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const todo = {
    id: Math.random(),
    name: todoInput.value,
    completed: false,
  };
  todos.push(todo);
  displayTodos();
  todoForm.reset();
});
function displayTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    const div = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.classList.add("form-check-input", "ms-1");
    const span = document.createElement("span");
    span.innerText = todo.name;
    span.classList.add("ms-2");
    div.append(checkbox);
    div.append(span);
    li.append(div);
    todoList.append(li);
  });
}
