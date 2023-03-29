
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
        getProgressBarWidth(index);
        getFirstCharacterOfNames(index);
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

function showTasksOnBoardHTML(index, element) {
    return `
    <div class="box"  onclick="showTask(${element.id})" draggable="true" ondragstart="startDragging(${element.id})">
        <div class="category ${element.category}">${element.category}</div>
        <div class="title">${element.title}</div>
        <div class="description">${element.description}</div>

    <div class="oneRow">
        <div class="container">
           <div class="progress">
                <div id="bar${index}" class="bar ${element.category}"></div>
           </div>
        </div>
        <div class="howMuch">${countTrue(index)}/${element.subtasks.length} done</div>
    </div>

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
        document.getElementById(`assignTo${i}`).innerHTML += `<div class="bigNameCircle" style="background-color: ${contacts[index].contactColor}">${element}</div>`;
    }
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
    // let index = -1;
    let searchFor = objID;
    let whatINeed = tasks.findIndex(obj => obj.id == searchFor);
    return whatINeed;
}

function showTask(index) {
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
            <div class="overlayContent"><b>Priority:</b>  ${element.priority}<img src="assets/img/${element.priority}.svg"></div>
        
            <div id="assignTo${index}" class="assignTo"><b> Assigned To:</b></div>
            <div id="assign"></div>
    </div>
        <div class="fullUseOfSpaceBottom">
            <div id="edit${j}" class="edit" onclick="renderEditTask(${j})"><img id="edit${j}" src="./assets/img/edit.svg"></div>
        </div>
</div>`;
showAssigned(element);
}

function closeTask(){
    document.getElementById('overlayTask').classList.add('d-none');
}

function showAssigned(element){
    console.log(element.assignedTo);
for (let index = 0; index < element.assignedTo.length; index++) {
    
    let people = element.assignedTo[index];
       document.getElementById('assign').innerHTML += `<div>${people}</div>`;
}
}


function renderEditTask(i){
    document.getElementById('overlayTask').classList.add('d-none');
    document.getElementById('editTask').classList.remove('d-none');
  console.log(i);
    let edit = document.getElementById('editTask');
    edit.innerHTML += `<div class="containerEditTask">
    <div class="inputUnit">
        <label for="name">Title</label>
        <input id="title" class="input" type="text">
    </div>
    <div class="inputUnit">
        <label for="description">Description</label>
        <textarea id="description" class="inputDescription" type="textarea"></textarea>
    </div>
    <div class="inputUnit" id="inputUnit">
        <label>Category</label>
        <div class="inputArea" id="newCateg">
            <div id="selectedCategory">Select a Category</div>
            <img src="assets/img/openMenuIcon.svg" onclick="toggleOptions()" alt="">
        </div>
        <div id="seeCat" class="d-none">
            <div class="options" id="optionsCat"></div>
        </div>
    </div>


    <div class="inputUnit">
        <label>Assigned to</label>
        <div class="inputArea">
            <div id="selected">Assigned to</div>
            <img src="assets/img/openMenuIcon.svg" onclick="toggleOptionsAss()" alt="">
        </div>
        <div id="see" class="d-none">
            <div class="options" id="optionsUser"></div>
        </div>

    </div>
    <div id="showAssignedPeople"></div>

    <div class="inputUnit">
    <label for="dueDate">Due Date</label>
    <input id="dueDate" class="input" type="date" required min="${getTodayDate()}" value="${getTodayDate()}">
</div>
<div class="inputUnit">
    <label for="prio">Prio</label>
    <div class="prioButtons">
        <button onclick="selectButton(0)" class="buttonPrio" id="urgent">Urgent<img id="picurgent"
                src="assets/img/urgent.svg"></button>
        <button onclick="selectButton(1)" class="buttonPrio" id="medium">Medium<img id="picmedium"
                src="assets/img/medium.svg"></button>
        <button onclick="selectButton(2)" class="buttonPrio" id="low">Low<img id="piclow"
                src="assets/img/low.svg"></button>
    </div>
</div>
<div class="inputUnit">
    <label for="subtask">Subtasks</label>
    <input id="subtask" class="input" type="text" placeholder="Add new subtask">
    <div class="plus"><img src="assets/img/plus.svg" onclick="addSubtask()" alt=""></div>
</div>
<div id="displaySubtasks"></div>
<div class="BTN">
    <button id="createTaskBTN" onclick="clear()">Cancel<img src=""></button>
    <button id="createTaskBTN" onclick="addTask()">Create Task<img src=""></button>
</div>



</div>

    

</div>`;
renderUserAssignTo();
renderCategories();
title.value = tasks[i].title;
description.value = tasks[i].description;
 selectedCategory.textContent = tasks[i].category;
}