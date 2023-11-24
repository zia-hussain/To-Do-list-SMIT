// Event listener for when the window has fully loaded
window.addEventListener("load", () => {
  // Load todos from localStorage or initialize an empty array
  todos = JSON.parse(localStorage.getItem("todos")) || [];

  // Get references to DOM elements
  const nameInput = document.querySelector("#name");
  const newTodoForm = document.querySelector("#new-todo-form");

  // Get username from localStorage or initialize an empty string
  const username = localStorage.getItem("username") || "";

  // Set the value of the name input to the stored username
  nameInput.value = username;

  // Event listener for changes in the name input
  nameInput.addEventListener("change", (e) => {
    // Store the updated username in localStorage
    localStorage.setItem("username", e.target.value);
  });

  // Event listener for form submission when adding a new todo
  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Create a new todo object
    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    // Input validation
    if (!nameInput.value) {
      alert("Username must be filled out");
    } else if (!todo.content) {
      alert("Please enter a todo before adding!");
    } else if (!todo.category) {
      alert("Please select a category for your todo!");
    } else {
      // Add the new todo to the todos array
      todos.push(todo);

      // Store the updated todos array in localStorage
      localStorage.setItem("todos", JSON.stringify(todos));

      // Reset the form
      e.target.reset();

      // Display the updated list of todos
      DisplayTodos();
    }
  });

  // Initial display of todos when the page loads
  DisplayTodos();
});


//+++++++++++++++++++++++++++++++++++= Function to display todos in the UI
function DisplayTodos() {
  // Get a reference to the todo list container
  const todoList = document.querySelector("#todo-list");
  // Clear the existing content of the todo list
  todoList.innerHTML = "";

  // Iterate through each todo in the todos array
  todos.forEach((todo) => {
    // Create elements for displaying the todo
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");


      // Create elements for displaying todo details (label, input, span, content, actions, edit, deleteButton)
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteButton = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");
    if (todo.category == "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("business");
    }
    content.classList.add("todo-content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteButton.classList.add("delete");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    edit.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add("done");
    }

    input.addEventListener("change", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }

      DisplayTodos();
    });

    edit.addEventListener("click", (e) => {
      const input = content.querySelector("input");
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplayTodos();
      });
    });

    deleteButton.addEventListener("click", (e) => {
      alert("Are you sure you want to delete this todo?");
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      DisplayTodos();
    });
  });
}
