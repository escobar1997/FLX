const propDivList = 0;
const propAddBtn = 0;
const listLength = 10;
const one = 1;
let dragging = null;
let rootNode = document.getElementById('root');
let divList = document.getElementsByClassName('list')[propDivList];
let addBtn = document.getElementsByClassName('add-btn')[propAddBtn];
let addInp = document.getElementById('adding-inp');
let notif = document.getElementById('notif');
notif.style.display = 'none';

addBtn.addEventListener('click', addList);
function addList() {
  let check = document.createElement('button');
  let checkText = document.createTextNode('check_box_outline_blank');
  let label = document.createElement('label');
  let inpText = document.createTextNode(addInp.value);
  let delBtn = document.createElement('button');
  let btnText = document.createTextNode('delete');
  let div = document.createElement('div');

  div.className = 'list-item';
  div.setAttribute('draggable', 'true');
  check.className = 'material-icons check';
  check.setAttribute('type', 'button');
  check.setAttribute('name', 'checkbox');
  delBtn.className = 'material-icons del-btn';
  delBtn.setAttribute('type', 'button');

  check.appendChild(checkText);
  label.appendChild(check);
  label.appendChild(inpText);
  delBtn.appendChild(btnText);
  div.appendChild(label);
  div.appendChild(delBtn);
  divList.appendChild(div);

  if (document.getElementsByClassName('list-item').length < listLength) {
    addInp.value = '';
    addBtn.disabled = true;

  } else {
    notif.style.display = 'block';
    addInp.value = '';
    addInp.disabled = true;
    addBtn.disabled = true;
  }
}

addInp.addEventListener('input', function () {
  if (addInp.value !== '') {
    addBtn.disabled = false;
  } else {
    addBtn.disabled = true;
  }
})

addBtn.addEventListener('click', delBtnAdd);
function delBtnAdd() {
  let delBtn = document.getElementsByClassName('del-btn');
  let propBtn = delBtn.length - one;

  delBtn[propBtn].addEventListener('click', delElem)
  function delElem (e) {
    divList.removeChild(e.target.parentNode);

    addInp.disabled = false;
    notif.style.display = 'none';
  }
}

addBtn.addEventListener('click', checkOnce);
function checkOnce() {
  let inputs = document.querySelectorAll('button[name=checkbox]');
  let propInp = inputs.length - one;
  inputs[propInp].addEventListener('click', function (chk) {
    chk.target.innerHTML = 'check_box';
  })
}

addBtn.addEventListener('click', dragst);
function dragst() {
  let lists = document.getElementsByClassName('list-item');
  let propLists = lists.length - one;
  lists[propLists].addEventListener('dragstart', function(event) {
      dragging = event.target;
  });
}

addBtn.addEventListener('click', dragle);
function dragle() {
  let lists = document.getElementsByClassName('list-item');
  let propLists = lists.length - one;
  lists[propLists].addEventListener('dragleave', function(event) {
      event.target.style['border-bottom'] = '';
  });
}

addBtn.addEventListener('click', dragen);
function dragen() {
  let lists = document.getElementsByClassName('list-item');
  let propLists = lists.length - one;
  lists[propLists].addEventListener('dragenter', function(event) {
      event.target.style['border-bottom'] = 'solid 4px black';
  });
}

divList.addEventListener('dragover', function(event) {
    event.preventDefault();
});

divList.addEventListener('drop', function(event) {
    event.preventDefault();
    event.target.style['border-bottom'] = '';
    event.target.parentNode.parentNode.insertBefore(dragging, event.target.parentNode.nextSibling);
});
