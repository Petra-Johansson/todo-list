const error = document.getElementById("errorMessage");
var saveText;

class TodoList {
  // Constructor for class TodoList, takes the variable put into the class contructor and sets it equal to todoList.
  // in other words it takes the data from outside the class and puts it into the class.
  constructor(list) {
    this.todoList = list;
  }

  // A function that's inside a class is called a method, and this method "addTodo" creates our entries,
  // it's complete with error handling for empty values, event listeners tied to the different buttons
  // and a reset of the value of our input field.
  addTodo() {
    let text = document.getElementById("inputNewTask").value;

    if (text === "") {
      error.innerHTML = "You have to type a task to add!";
      error.hidden = false;
    } else {
      let list = document.getElementById("todo-list");
      var li = document.createElement("li");

      var btnEdit = document.createElement("button");
      btnEdit.innerHTML = "Edit";
      btnEdit.setAttribute("id", "edit-button");
      // what we see here is a simple function tied to a event listener on the button, the function takes
      // in the event from the event listner, it then uses the event and the .target functionality to get the element
      // that was clicked and passes that into the editTodoFunc function, which in turn calls on the editTodo method.
      // the logic is the same for the other buttons and their event listeners.
      btnEdit.addEventListener("click", function (e) {
        editTodoFunc(e.target);
      });

      var btnDone = document.createElement("button");
      btnDone.innerHTML = "Done";
      btnDone.setAttribute("id", "done-button");
      btnDone.addEventListener("click", function (e) {
        moveTodoFunc(e.target);
      });
      var btnDelete = document.createElement("button");
      btnDelete.innerHTML = "Delete";
      btnDelete.setAttribute("id", "delete-button");
      btnDelete.addEventListener("click", function (e) {
        deleteTodoFunc(e.target);
      });

      var label = document.createElement("label");
      label.innerText = text;
      label.setAttribute("id", "labelText");
      // We create our label with the attribute "contenteditable" set to false so that we can do a check for it's
      // value in the editTodo method, if it's false it sets it to true and vise versa.
      label.setAttribute("contenteditable", "false");
      li.appendChild(label);
      li.appendChild(btnDone);
      li.appendChild(btnEdit);
      li.appendChild(btnDelete);

      list.appendChild(li);
      this.todoList.appendChild(li);
      error.hidden = true;
      inputNewTask.value = "";
    }
  }

  editTodo(e) {
    // gets the parent node of the clicked button, in this case it's the edit button so the parent node is
    // the li element with all the other buttons aswell as the label containing the text.
    let todo = e.parentNode;
    // the label is always the firstChild of the li parent node, so we can access it like this.
    let label = todo.firstChild;

    // logic to check if contenteditable is toggled or not, so that we can turn it off or on with the same method.
    if (label.getAttribute("contenteditable") == "true") {
      label.setAttribute("contenteditable", "false");
      e.innerHTML = "Edit";
      // logic to check so that the user does not leave the label empty when they turn off the edit.
      // if they try to toggle the edit off with an empty label it will revert to earlier value and
      // post a error message.
      if (label.innerHTML.trim() == "") {
        error.innerHTML = "You can't update to empty!";
        error.hidden = false;
        label.innerHTML = saveText;
      }
    } else {
      // When you toggle a label so that it's editable it saves the value.
      saveText = label.innerHTML;
      e.innerHTML = "Save";
      label.setAttribute("contenteditable", "true");
      error.hidden = true;
    }
  }
  // Super simple logic, we send in the delete button, by using the event.target in the eventlistener that we added
  // on creating the delete button, so we just take the parent node of the delete button which is the container for
  // the whole Todo item and then we remove it.
  deleteTodo(e) {
    e.parentNode.remove();
  }

  moveTodo(e) {
    // gets the text in the label element.
    let value = e.parentNode.firstChild.innerHTML;
    // gets the done list
    let getDoneList = document.getElementById("ulCompletedTodos");
    // use done list to create object of type DoneList so that we can access its addDone method
    let functionalDoneList = new DoneList(getDoneList);
    // use the addDone method to add a "Done" with the text of the todo user wanted to move
    functionalDoneList.addDone(value);
    // remove the todo. Even though what's really happening is that we remove a todo and and a done with the same
    // text, in terms of functionality it's the same as taking the todo and adding it to the done list.
    e.parentNode.remove();
  }
  // Once again very simple logic, empties the todo list of all child elements.
  deleteAllTodos() {
    document.getElementById("todo-list").innerHTML = "";
  }
}

// The logic behind the DoneList methods and the TodoList methods is about the same, check those comments for
// reminder of code logic.
class DoneList {
  constructor(list) {
    this.doneList = list;
  }
  addDone(text) {
    let list = document.getElementById("ulCompletedTodos");
    var li = document.createElement("li");

    list.appendChild(li);
    this.doneList.appendChild(li);

    //DONE-BUTTONS
    var btnEdit = document.createElement("button");
    btnEdit.innerHTML = "Edit";
    btnEdit.setAttribute("id", "edit-button");
    btnEdit.addEventListener("click", function (e) {
      editDoneFunc(e.target);
    });

    var btnDelete = document.createElement("button");
    btnDelete.innerHTML = "Delete";
    btnDelete.setAttribute("id", "delete-button");
    btnDelete.addEventListener("click", function (e) {
      deleteDoneFunc(e.target);
    });
    //APPEND ALL
    var label = document.createElement("label");
    label.innerText = text;
    label.setAttribute("id", "doneLabelText");
    label.setAttribute("contenteditable", "false");
    li.appendChild(label);

    li.appendChild(btnEdit);
    li.appendChild(btnDelete);

    list.appendChild(li);
    this.doneList.appendChild(li);
  }

  editDone(e) {
    let done = e.parentNode;
    let label = done.firstChild;

    if (label.getAttribute("contenteditable") == "true") {
      label.setAttribute("contenteditable", "false");
      e.innerHTML = "Edit";
      if (label.innerHTML.trim() == "") {
        error.innerHTML = "You can't update to empty!";
        error.hidden = false;
        label.innerHTML = saveText;
      }
    } else {
      saveText = label.innerHTML;
      e.innerHTML = "Save";
      label.setAttribute("contenteditable", "true");
      error.hidden = true;
    }
  }

  deleteDone(e) {
    e.parentNode.remove();
  }

  moveDone(e) {
    let value = e.parentNode.firstChild.innerHTML;
    let getTodoList = document.getElementById("todo-list");
    let functionalTodoList = new TodoList(getTodoList);
    functionalTodoList.addTodo(value);
    e.parentNode.remove();
  }

  deleteAllDone() {
    document.getElementById("ulCompletedTodos").innerHTML = "";
  }
}

// ALL FUNCTIONS
let getTodoList = document.getElementById("todo-list");
let functionalTodoList = new TodoList(getTodoList);
let getDoneList = document.getElementById("ulCompletedTodos");
let functionalDoneList = new DoneList(getDoneList);

function addTodoFunc() {
  functionalTodoList.addTodo();
}
function editTodoFunc(e) {
  functionalTodoList.editTodo(e);
}
function moveTodoFunc(e) {
  functionalTodoList.moveTodo(e);
}
function deleteTodoFunc(e) {
  functionalTodoList.deleteTodo(e);
}

function editDoneFunc(e) {
  functionalDoneList.editDone(e);
}
function moveDoneFunc(e) {
  functionalDoneList.moveDone(e);
}
function deleteDoneFunc(e) {
  functionalDoneList.deleteDone(e);
}

// Makes it possible to press Enter to add task instead of using button
const inputNewTask = document.getElementById("inputNewTask");
inputNewTask.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addTodoFunc();
  }
});

// Deletes all items in todo- and donelist by onClick
function deleteAllFunc() {
  functionalTodoList.deleteAllTodos();
  functionalDoneList.deleteAllDone();
}
