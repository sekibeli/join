
let currentdraggableElement;
let stati = ['todo', 'inProgress', 'awaitingFeedback', 'done'];

let a = 0;

function clearBoard() {
    document.getElementById('todo').innerHTML = ``;
    document.getElementById('inProgress').innerHTML = ``;
    document.getElementById('awaitingFeedback').innerHTML = ``;
    document.getElementById('done').innerHTML = ``;
}


function renderAll() {
    for (let index = 0; index < tasks.length; index++) {
        const element = tasks[index];
        document.getElementById(`${element.status}`).innerHTML += showTasksOnBoardHTML(index, element);
        
       
        if(element.subtasks.length > 0){
            document.getElementById(`progressField${index}`).innerHTML += renderProgressBar(index,element);
            getProgressBarWidth(index);
            }
        // getFirstCharacterOfNames(index);
        renderContactsOnBoard(index);
    }
    renderPlaceholder();
}

function renderPlaceholder() {
    stati.forEach(element => {
        generatePlaceholderBox(`${element}`);
    });
}


function showTasksOnBoard() {
    clearBoard();
    renderAll();
}

function renderProgressBar(index,element){
  return `  <div class="oneRow">
    <div class="container">
       <div class="progress">
            <div id="bar${index}" class="bar ${element.category}"></div>
       </div>
    </div>
    <div class="howMuch">${countTrue(index)}/${element.subtasks.length} done</div>
</div>`;
}


function showTasksOnBoardHTML(index, element) {
    return `
    <div class="box"  onclick="showTask(${element.id})" draggable="true" ondragstart="startDragging(${element.id})">
        <div class="category ${element.category}">${element.category}</div>
        <div class="title">${element.title}</div>
        <div class="description">${element.description}</div>
<div id="progressField${index}"></div>
    <div class="oneRow">
        <div id="assignTo${index}" class="assignTo"></div>
        <img src="assets/img/${element.priority}.svg">
</div>` ;
}


function delay() {
    setTimeout(function () {
        showTasksOnBoard();
    }, 300);
}

// function changeStatus(i){
// tasks[i].status = `inProgress`;
// showTasksOnBoard();
// }

function getProgressBarWidth(i) {
    let numberDone = 0;
    for (let index = 0; index < tasks[i].checkBxSub.length; index++) {
        const element = tasks[i].checkBxSub[index];
        if (element) numberDone++;
    }
    getDoneSubtasks(i, numberDone);
}


function getDoneSubtasks(i, numberDone) {
    let total = tasks[i].checkBxSub.length;
    let width = numberDone / total * 100;
    document.getElementById(`bar${i}`).style.width = `${width}%`;
}


function countTrue(i) {
    let element = tasks[i].checkBxSub;
    let count = element.filter(x => x == true).length;
    return count;
}


function getFirstCharacterOfNames(i) {
    let acronym = [];
    for (let index = 0; index < tasks[i].assignedTo.length; index++) {
        let fullname = tasks[i].assignedTo[index];
        acronym.push(fullname.split(/\s/).reduce((response, word) => response += word.slice(0, 1), ''));
    }
    renderAcronym(i, acronym);
}


function renderAcronym(i, acronym) {
    for (let index = 0; index < acronym.length; index++) {
        const element = acronym[index];
        // document.getElementById(`assignTo${i}`).innerHTML += `<div class="bigNameCircle" style="background-color: ${contacts[index].color}">${element}</div>`;
    }
}

function renderContactsOnBoard(i){
    document.getElementById(`assignTo${i}`).innerHTML += `<div class="bigNameCircle" style="background-color: ${colors[contacts[i].color]}">${contacts[i].initials}</div>`;
}


function generatePlaceholderBox(status) {
    document.getElementById(status).innerHTML += `<div class="placeholder d-none" id="box-end-Column-${status}"></div>`;
}

function startDragging(id) {
    currentdraggableElement = id;
    let allPlaceholder = document.querySelectorAll('.placeholder');
    for (let i = 0; i < allPlaceholder.length; i++) {
        allPlaceholder[i].classList.remove('d-none');
        allPlaceholder[i].classList.add('showShort');
    }
}


function setStatus(stat) {
    tasks[currentdraggableElement].status = stat;
    saveTasks();
    showTasksOnBoard();
}


function allowDrop(ev) {
    ev.preventDefault();
}


function getTheRightTask(objID) {
    let searchFor = objID;
    let whatINeed = tasks.findIndex(obj => obj.id == searchFor);
    return whatINeed;
}

function showTask(index) {
    document.getElementById('makeBgDarker').classList.remove('d-none');
    document.getElementById('overlayTask').innerHTML = ``;
    let j = getTheRightTask(index);
    document.getElementById('overlayTask').classList.remove('d-none');
    let element = tasks[j];
    document.getElementById('overlayTask').innerHTML += `
    
<div class="fullUseOfSpace">
    <div class="fullUseOfSpaceTop">
            <div class="overlayOneRow">
                <div class="overlayCategory ${element.category}">${element.category}</div>
                <div id="closeTask" onclick="closeTask()">X</div>
            </div>
            <div class="overlayTitle">${element.title}</div>
            <div class="overlayDescription">${element.description}</div>
            <div class="overlayContent"><b>Due Date:</b> ${element.duedate}</div>
            <div class="overlayContent"><b>Priority:</b><div id="priority">${element.priority}<img id="prioPic" src="assets/img/${element.priority}.svg"></div></div>
        
            <div id="assignTo${index}" class="assignTo"><b> Assigned To:</b></div>
            <div id="assign"></div>
    </div>
        <div class="fullUseOfSpaceBottom">
            <div id="edit${j}" class="edit" onclick="showEditTask(${j})"><img  id="edit${j}" src="./assets/img/edit.svg" ></div>
        </div>
</div>
`;
showAssigned(element);
getbgColor(index);
}

function close(){
    console.log('Fenster schließen');
    document.getElementById('addTaskForm').classList.add('d-none');
    document.getElementById('makeBgDarker').classList.add('d-none');
    
}

function showEditTask(i){
    showAddTaskOverlay();
    document.getElementById('overlayTask').classList.add('d-none');
    document.getElementById('divider').classList.add('d-none');
    document.getElementById('mainAddTask').classList.remove('d-flex');
    document.getElementById('addTaskForm').classList.remove('containerTasks');
    document.getElementById('addTaskForm').classList.remove('overlay');
    document.getElementById('addTaskForm').classList.add('overlayEdit');
    document.getElementById('BTN').classList.add('d-none');
  document.getElementById('BTN-save').classList.remove('d-none');

    loadTheTaskContent(i)
    checkSubtasks(i);
    readPrio(i);
    createSaveButton(i);
}

function createSaveButton(i){
    document.getElementById('BTN-save').innerHTML = `<button class="btn" id="ok" onclick="saveExistingTask(${i})">Ok<img src=""></button>`;
}

function getbgColor(index){
    if (tasks[index].priority == 'urgent') {
        document.getElementById('prioPic').classList.add('invert');
    document.getElementById('priority').classList.add('red');
}
   
   
    else if (tasks[index].priority == 'medium'){
        document.getElementById('prioPic').classList.add('invert');
        document.getElementById('priority').classList.add('orange');
    }
    
    else if(tasks[index].priority == 'low') {
        document.getElementById('prioPic').classList.add('invert');
        document.getElementById('priority').classList.add('green');
    }
    
}

function closeTask(){
    document.getElementById('makeBgDarker').classList.add('d-none');
    document.getElementById('overlayTask').classList.add('d-none');
    document.getElementById('editTask').classList.add('d-none');
}

function showAssigned(element){
    console.log(element.assignedTo);
for (let index = 0; index < element.assignedTo.length; index++) {
    
    let people = element.assignedTo[index];
       document.getElementById('assign').innerHTML += `<div>${people}</div>`;
}
}


function loadTheTaskContent(i){
    
    title.value = tasks[i].title;
description.value = tasks[i].description;
  selectedCategory.textContent = tasks[i].category;
 duedate.value = tasks[i].duedate;
//  showSubtasks(tasks[i].subtasks)
}


function saveExistingTask(i){
    let assignedTo = getAssignedToUser();
  let title = document.getElementById('title');
  let description = document.getElementById('description');
  let category = document.getElementById('selectedCategory');
  let duedate = document.getElementById('dueDate');
    let task = {
        'id': i,
        'status': tasks[i].status,
        'title': title.value,
        'description': description.value,
        'duedate': duedate.value,
        'priority': prio,
        'assignedTo': assignedTo,
        'category': tasks[i].category,
        'subtasks': subtasks,
        'checkBxSub': checkCheckedBoxes()
      }
      tasks[i] = task;
      saveTasks();
      document.getElementById('addTaskForm').classList.add('d-none');
        showTask(i)

}


function readPrio(i){
    console.log(i);
   if(tasks[i].priority == 'urgent') renderUrgentHTML();
   else if (tasks[i].priority == 'medium') renderMediumHTML();
   else if(tasks[i].priority == 'low') renderLowHTML();

}

function closeIt(){
    document.getElementById('editTask').classList.add('d-none');
    document.getElementById('makeBgDarker').classList.add('d-none');
    document.getElementById('addTaskForm').classList.add('d-none');
}

function setDarkLayer(){
    document.getElementById('makeBgDarker').classList.add('d-none');
}
function renderUrgentHTML(){
    document.getElementById('prioButtons').innerHTML = ``;
    document.getElementById('prioButtons').innerHTML +=
     ` <button onclick="selectButton(0)" class="buttonPrio red" id="urgent">Urgent<img id="picurgent"
    src="assets/img/urgent.svg" style="filter:brightness(0) invert(1)"></button>
    <button onclick="selectButton(1)" class="buttonPrio" id="medium">Medium<img id="picmedium"
    src="assets/img/medium.svg"></button>
    <button onclick="selectButton(2)" class="buttonPrio" id="low">Low<img id="piclow"
    src="assets/img/low.svg"></button>`
}
function renderMediumHTML(){
    document.getElementById('prioButtons').innerHTML = ``;
    document.getElementById('prioButtons').innerHTML += ` <button onclick="selectButton(0)" class="buttonPrio" id="urgent">Urgent<img id="picurgent"
    src="assets/img/urgent.svg"></button>
    <button onclick="selectButton(1)" class="buttonPrio orange" id="medium">Medium<img id="picmedium"
    src="assets/img/medium.svg" style="filter:brightness(0) invert(1)"></button>
    <button onclick="selectButton(2)" class="buttonPrio" id="low">Low<img id="piclow"
    src="assets/img/low.svg"></button>`
}
function renderLowHTML(){
    document.getElementById('prioButtons').innerHTML = ``;
    document.getElementById('prioButtons').innerHTML += ` <button onclick="selectButton(0)" class="buttonPrio" id="urgent">Urgent<img id="picurgent"
    src="assets/img/urgent.svg"></button>
    <button onclick="selectButton(1)" class="buttonPrio" id="medium">Medium<img id="picmedium"
    src="assets/img/medium.svg"></button>
    <button onclick="selectButton(2)" class="buttonPrio green" id="low">Low<img id="piclow"
    src="assets/img/low.svg" style="filter:brightness(0) invert(1)"></button>`
}

function checkSubtasks(i) {
    console.log('checkSubtasks');
    document.getElementById('displaySubtasks').innerHTML = ``;
    let subtasks = tasks[i].subtasks;
    let checkos = tasks[i].checkBxSub;
    let ch = ``;
   for (let index = 0; index < subtasks.length; index++) {
    const element = subtasks[index];
    console.log(checkos[index]);
    if(checkos[index]) ch = 'checked';
    
    document.getElementById('displaySubtasks').innerHTML += `
      <div class="wrapper">
        <input type="checkbox" name="subtask" value="${element}" ${ch}>
        <label for="subtask">${element}</label>
      </div>`;
      ch = '';
   }
      
  }
  

function showAddTaskOverlay(){
    showDarkOverlay();
    document.getElementById('addTaskForm').classList.remove('d-none');
    renderCategriesAndContacts();
}

  function closeItToo(){
    document.getElementById('flyingAddTask').classList.add('d-none');
    document.getElementById('makeBgDarker').classList.add('d-none');
  }
 

  function showDarkOverlay(){
    document.getElementById('makeBgDarker').classList.remove('d-none');
  }