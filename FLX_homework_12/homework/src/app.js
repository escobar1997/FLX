const rootNode = document.getElementById('root');
const todoApl = document.getElementById('todo-apl');
const newTask = document.getElementById('new-task-add');
const modTask = document.getElementById('modify-task');
const taskList = document.getElementById('task-list');
const newTaskInp = document.getElementById('new-task-inp');
const modifTaskInp = document.getElementById('modif-task-inp');
const checkedItem = document.getElementById('checked-item');
const uncheckedItem = document.getElementById('unchecked-item');
const notif = document.getElementById('notif');

const todoItems = [
     {isDone: false, id: 12345, description: 'Todo 1'},
];
let todoItemsJSON = sessionStorage.getItem('todo');
let help = JSON.parse(todoItemsJSON);
if (help != null) {
  todoItems.splice(0, 1);
  console.log(todoItems);
  for (var i = 0; i < help.length; i++) {
    todoItems.push(help[i]);
  }
}

const addBtn = document.getElementById('add-btn');
const saveChngBtn = document.getElementById('save-changes-btn');
const saveModifBtn = document.getElementById('save-modif-btn');
const cancelBtn = document.getElementById('cancel-btn');
const cancelModifBtn = document.getElementById('cancel-modif-btn');

let modifyItem = null;
const zero = 0;

newTask.style.display = 'none';
modTask.style.display = 'none';
saveChngBtn.disabled = true;

window.addEventListener('load', function () {
  window.location.hash = '';
  if (todoItems.length > 0) {
    notif.style.display = 'none';
  }
  for (var i = 0; i < todoItems.length; i++) {

    let div = document.createElement('div');
    div.setAttribute('class', 'task-list-item');
    div.setAttribute('id', todoItems[i].id);

    let checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('class', 'check');
    checkBox.checked = todoItems[i].isDone;

    let label = document.createElement('label');
    label.setAttribute('class', 'modif-label');
    label.innerHTML = todoItems[i].description;

    let delBtn = document.createElement('button');
    delBtn.setAttribute('type', 'button');
    delBtn.setAttribute('class', 'del-btn');

    div.appendChild(checkBox);
    div.appendChild(label);
    div.appendChild(delBtn);
    if (todoItems[i].isDone) {
      label.style.background = 'grey';
      checkedItem.appendChild(div);
    } else {
      uncheckedItem.appendChild(div);
      label.addEventListener('click', labelClick);
    }

    checkBox.addEventListener('change', checkUsage);
    delBtn.addEventListener('click', delBtnUsage);
  }
})

window.addEventListener('hashchange', function () {
  if (window.location.hash === '#/add') {
    newTask.style.display = 'block';
    todoApl.style.display = 'none';
  } else if (window.location.hash === '') {
    newTask.style.display = 'none';
    modTask.style.display = 'none';
    todoApl.style.display = 'block';
  } else if (window.location.hash === '#/modif') {
    modTask.style.display = 'block';
    todoApl.style.display = 'none';
  }
})

addBtn.addEventListener('click', function () {
  window.location.hash = '/add';
})

newTaskInp.addEventListener('input', function () {
  if (newTaskInp.value === ''){
    saveChngBtn.disabled = true;
  } else {
    saveChngBtn.disabled = false;
  }
})

saveChngBtn.addEventListener('click', function (event) {
  window.history.back();

  let div = document.createElement('div');
  div.setAttribute('class', 'task-list-item');
  console.log(todoItems[todoItems.length - 1].id);
  div.setAttribute('id', todoItems[todoItems.length - 1].id + 1);

  let checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  checkBox.setAttribute('class', 'check');

  let label = document.createElement('label');
  label.setAttribute('class', 'modif-label');
  label.innerHTML = newTaskInp.value;

  let delBtn = document.createElement('button');
  delBtn.setAttribute('type', 'button');
  delBtn.setAttribute('class', 'del-btn');

  div.appendChild(checkBox);
  div.appendChild(label);
  div.appendChild(delBtn);
  uncheckedItem.appendChild(div);

  console.log(newTaskInp.value);
  todoItems.push({isDone: false,
                  id: parseInt(div.id),
                  description: newTaskInp.value});

  sessionStorage.removeItem('todo');
  sessionStorage.setItem('todo', JSON.stringify(todoItems));

  newTaskInp.value = '';
  saveChngBtn.disabled = true;

  let items = document.getElementsByClassName('task-list-item').length;
  console.log(todoItems);
  if (items > zero) {
    notif.style.display = 'none';
  }
})

saveChngBtn.addEventListener('click', checking);
function checking() {
  let check = document.getElementsByClassName('check');
  let checkedLen = document.getElementsByClassName('checked-in-div').length;
  let propCheck = check.length - checkedLen - 1;

  check[propCheck].addEventListener('change', checkUsage);
}
function checkUsage(event) {

  let label = event.target.parentNode.childNodes[1];

  if (event.target.checked) {
    checkedItem.appendChild(event.target.parentNode);
    event.target.parentNode.className = 'task-list-item checked-in-div';
    //console.log(event.target.parentNode.childNodes[1]);
    label.style.background = 'grey';
    label.removeEventListener('click', labelClick);
    //console.log(event.target.parentNode);
    for (var i = 0; i < todoItems.length; i++) {
      if (todoItems[i].id == event.target.parentNode.id) {
        todoItems[i].isDone = true;
      }
    }
    sessionStorage.removeItem("todo");
    sessionStorage.setItem('todo', JSON.stringify(todoItems));
    console.log(event.target.parentNode);
  } else {
    uncheckedItem.appendChild(event.target.parentNode);
    event.target.parentNode.className = 'task-list-item';
    label.style.background = 'transparent';
    label.addEventListener('click', labelClick);
    for (var i = 0; i < todoItems.length; i++) {
      if (todoItems[i].id == event.target.parentNode.id) {
        todoItems[i].isDone = false;
      }
    }
    sessionStorage.removeItem('todo');
    sessionStorage.setItem('todo', JSON.stringify(todoItems));
  }
}


saveChngBtn.addEventListener('click', addLabelClick);
function addLabelClick() {
  let label = document.getElementsByClassName('modif-label');
  let checkedLen = document.getElementsByClassName('checked-in-div').length;
  let propLabel = label.length - checkedLen - 1;
  label[propLabel].addEventListener('click', labelClick);
}
function labelClick (event) {
  window.location.hash = '/modif';
  console.log(event.target.parentNode.id);
  modifTaskInp.value = event.target.textContent;
  modifyItem = event.target;
}

saveChngBtn.addEventListener('click', addDelBtn);
function addDelBtn() {

  let btn = document.getElementsByClassName('del-btn');
  let checkedLen = document.getElementsByClassName('checked-in-div').length;
  //console.log(checkedLen);
  let propBtn = btn.length - checkedLen - 1;
  //console.log(propBtn);

  btn[propBtn].addEventListener('click', delBtnUsage);
}

function delBtnUsage(event) {
  //console.log(event.target.parentNode.parentNode);
  if (event.target.parentNode.parentNode.id === 'unchecked-item') {

    for (var i = 0; i < todoItems.length; i++) {
      if (todoItems[i].id == event.target.parentNode.id) {
        todoItems.splice(i, 1);
      }
    }
    sessionStorage.removeItem("todo");
    sessionStorage.setItem('todo', JSON.stringify(todoItems));
    console.log(todoItems);
    uncheckedItem.removeChild(event.target.parentNode);
    //console.log(todoItems);


  } else if (event.target.parentNode.parentNode.id === 'checked-item') {

    checkedItem.removeChild(event.target.parentNode);

  }
  let items = document.getElementsByClassName('task-list-item').length;
  if (items === zero) {
    notif.style.display = 'block';
  }
}

modifTaskInp.addEventListener('focus', function () {
    modifTaskInp.select();
})

modifTaskInp.addEventListener('input', function () {
  if (modifTaskInp.value === ''){
    saveModifBtn.disabled = true;
  } else {
    saveModifBtn.disabled = false;
  }
})

saveModifBtn.addEventListener('click', function () {
  modifyItem.innerHTML = modifTaskInp.value;
  for (var i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id == modifyItem.parentNode.id) {
      todoItems[i].description = modifTaskInp.value;
    }
  }
  sessionStorage.removeItem("todo");
  sessionStorage.setItem('todo', JSON.stringify(todoItems));
  window.history.back();
})

cancelBtn.addEventListener('click', function () {
  window.history.back();
  newTaskInp.value = '';
})

cancelModifBtn.addEventListener('click', function () {
  window.history.back();
})
