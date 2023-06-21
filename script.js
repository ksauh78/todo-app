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
    li.classList.add("list-group-item", "d-flex", "justify-content-between");
    const div = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.classList.add("form-check-input", "ms-1");
    checkbox.addEventListener("change", (event) => {
      event.preventDefault();
      todo.completed = event.target.checked;
      displayTodos();
    });
    const span = document.createElement("span");
    span.innerText = todo.name;
    span.style.textDecoration = todo.completed ? "line-through" : "none";
    span.classList.add("ms-2");
    const rightDiv = document.createElement("div");
    div.append(checkbox);
    div.append(span);
    li.append(div);
    //Edit button
    const editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-secondary", "btn-sm");
    editButton.setAttribute("data-bs-toggle", "modal");
    editButton.setAttribute("data-bs-target", "#editModal");
    editButton.addEventListener("click", (event) => {
      event.preventDefault();
      document.getElementById("todo-edit").value = todo.name;
      document.getElementById("todo-id").value = todo.id;
      sessionStorage.setItem("todoId", todo.id);
    });

    editButton.innerHTML = "Edit";
    rightDiv.append(editButton);
    //Delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      todos = todos.filter((clickedTodo) => {
        return clickedTodo.id !== todo.id;
      });
      displayTodos();
    });
    rightDiv.append(deleteButton);
    li.append(rightDiv);
    todoList.append(li);
  });
}
const editHandler = (event) => {
  const storedVal = document.getElementById("todo-edit").value;
  const todoId = sessionStorage.getItem("todoId");
  event.preventDefault();
  todos = todos.map((value) => {
    return value.id === Number(todoId)
      ? {
          id: Number(todoId),
          name: storedVal,
          completed: false,
        }
      : value;
  });
  displayTodos();
  document.getElementById("btn-close").click();
};
