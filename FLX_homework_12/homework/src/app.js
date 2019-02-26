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
    {isDone: false, id: 12345, description: 'Todo 1'}
];

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

  let checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  checkBox.setAttribute('class', 'check');

  let label = document.createElement('label');
  label.setAttribute('class', 'modif-label');
  label.innerHTML = newTaskInp.value;

  let delBtn = document.createElement('button');
  delBtn.setAttribute('type', 'button');
  delBtn.setAttribute('class', 'del-btn');
  delBtn.innerHTML = 'del';

  div.appendChild(checkBox);
  div.appendChild(label);
  div.appendChild(delBtn);
  uncheckedItem.appendChild(div);

  newTaskInp.value = '';
  saveChngBtn.disabled = true;
  let items = document.getElementsByClassName('task-list-item').length;
  console.log(items);
  if (items > zero) {
    notif.style.display = 'none';
  }
})

saveChngBtn.addEventListener('click', checking);
function checking() {
  let check = document.getElementsByClassName('check');
  let checkedLen = document.getElementsByClassName('checked-in-div').length;
  let propCheck = check.length - checkedLen - 1;

  check[propCheck].addEventListener('change', function (event) {

    let label = event.target.parentNode.childNodes[1];

    if (event.target.checked) {
      checkedItem.appendChild(event.target.parentNode);
      event.target.parentNode.className = 'task-list-item checked-in-div';
      //console.log(event.target.parentNode.childNodes[1]);
      label.style.background = 'grey';
      label.removeEventListener('click', labelClick);
    } else {
      uncheckedItem.appendChild(event.target.parentNode);
      event.target.parentNode.className = 'task-list-item';
      label.style.background = 'transparent';
      label.addEventListener('click', labelClick);
    }
  })
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
  modifTaskInp.value = event.target.textContent;
  modifyItem = event.target;
}

saveChngBtn.addEventListener('click', addDelBtn);
function addDelBtn() {

  let btn = document.getElementsByClassName('del-btn');
  let checkedLen = document.getElementsByClassName('checked-in-div').length;
  console.log(checkedLen);
  let propBtn = btn.length - checkedLen - 1;
  console.log(propBtn);

  btn[propBtn].addEventListener('click', function (event) {
    console.log(event.target.parentNode.parentNode);
    if (event.target.parentNode.parentNode.id === 'unchecked-item') {
      uncheckedItem.removeChild(event.target.parentNode);
    } else if (event.target.parentNode.parentNode.id === 'checked-item') {
      checkedItem.removeChild(event.target.parentNode);
    }
    let items = document.getElementsByClassName('task-list-item').length;
    if (items === zero) {
      notif.style.display = 'block';
    }
  })
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
  window.history.back();
})

cancelBtn.addEventListener('click', function () {
  window.history.back();
  newTaskInp.value = '';
})

cancelModifBtn.addEventListener('click', function () {
  window.history.back();
})
