
let currentOpenTask;
let currentdraggableElement;
let stati = ['todo', 'inProgress', 'awaitingFeedback', 'done'];

let a = 0;

function clearBoard() {
    document.getElementById('todo').innerHTML = ``;
    document.getElementById('inProgress').innerHTML = ``;
    document.getElementById('awaitingFeedback').innerHTML = ``;
    document.getElementById('done').innerHTML = ``;
}


function renderCompleteBoard() {
    for (let index = 0; index < tasks.length; index++) {
        const element = tasks[index];
        document.getElementById(`${element.status}`).innerHTML += showTasksOnBoardHTML(index, element);
        if (element.subtasks.length > 0) {
            document.getElementById(`progressField${index}`).innerHTML += renderProgressBar(index, element);
            getDoneSubtasks(index)
        }
        renderContactsOnBoard(index, element);
        renderBgCategory(index);
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
    renderCompleteBoard();
}

function renderProgressBar(index, element) {
    return `  <div class="oneRow">
    <div class="container">
       <div class="progress">
            <div id="bar${index}" class="bar"></div>
       </div>
    </div>
    <div class="howMuch">${countTrue(index)}/${element.subtasks.length} done</div>
</div>`;
}


function showTasksOnBoardHTML(index, element) {
    return `
    <div class="box"  onclick="showTask(${element.id})" draggable="true" ondragstart="startDragging(${element.id})">
        <div class="category" id="categoryBgColor${index}">${element.category}</div>
        <div class="title">${element.title}</div>
        <div class="description">${element.description}</div>
<div id="progressField${index}"></div>
    <div class="oneRow">
        <div id="assignToBoard${index}" class="assignTo">hgjhghjg</div>
        <img src="assets/img/${element.priority}.svg">
</div>` ;
}

function renderBgCategory(index) {
    let count = getTheRightBgColor(tasks[index].category);
    let bgColor = categories[count].categoryColor;
    document.getElementById(`categoryBgColor${index}`).style.backgroundColor = bgColor;
}

function renderBgCategoryShowTask(index) {
    let count = getTheRightBgColor(tasks[index].category);
    let bgColor = categories[count].categoryColor;
    document.getElementById(`categoryBgColorShowTask${index}`).style.backgroundColor = bgColor;
}

function delay() {
    setTimeout(function () {
        showTasksOnBoard();
    }, 300);
}


function getDoneSubtasks(i) {
    let count = getTheRightBgColor(tasks[i].category);
    let bgColor = categories[count].categoryColor;
    let total = tasks[i].subtasks.length;
    let width = countTrue(i) / total * 100;
    document.getElementById(`bar${i}`).style.width = `${width}%`;
    document.getElementById(`bar${i}`).style.backgroundColor = bgColor;
}


function countTrue(i) {
    let element = tasks[i].subtasks;
    let count = element.filter(a => a.check == true);
    return count.length;
}


function renderContactsOnBoard(i, element) {
    document.getElementById(`assignToBoard${i}`).innerHTML = ``;
    let some = [];
    // for (let index = 0; index < element.assignedTo.length; index++) {
    some = element.assignedTo.filter(x => x.check == 'checked');
    // }
    for (let j = 0; j < some.length; j++) {
        const element = some[j];
        document.getElementById(`assignToBoard${i}`).innerHTML += `<div class="bigNameCircle bg${contacts[element.id].color}" >${contacts[element.id].initials}</div>`;
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
    let searchFor = objID;
    let whatINeed = tasks.findIndex(obj => obj.id == searchFor);
    return whatINeed;
}

// function getTheRightContact(objID) {
//     let searchFor = objID;
//     let whatINeed = contacts.findIndex(obj => obj.id == searchFor);
//     return whatINeed;
// }

function getTheAssignedContacts(objID) {
    let searchFor = objID;
    let whatINeed = contacts.findIndex(obj => obj.id == searchFor);
    return whatINeed;
}


function getTheRightBgColor(objID) {
    let searchFor = objID;
    let whatINeed = categories.findIndex(obj => obj.categoryName == searchFor);
    return whatINeed;
}

function showTask(index) {
    currentOpenTask = index;
    document.getElementById('makeBgDarker').classList.remove('d-none');
    document.getElementById('overlayTask').innerHTML = ``;
    let j = getTheRightTask(index);
    document.getElementById('overlayTask').classList.remove('d-none');
    let element = tasks[j];
    document.getElementById('overlayTask').innerHTML += `
    
<div class="fullUseOfSpace">
    <div class="fullUseOfSpaceTop">
            <div class="overlayOneRow">
                <div class="overlayCategory" id="categoryBgColorShowTask${index}">${element.category}</div>
                <div id="closeTask" onclick="closeTask()">X</div>
            </div>
            <div class="overlayTitle">${element.title}</div>
            <div class="overlayDescription">${element.description}</div>
            <div class="overlayContent"><b>Due Date: </b> ${element.duedate}</div>
            <div class="overlayContent"><b>Priority: </b><div id="priority">${element.priority}<img id="prioPic" src="assets/img/${element.priority}.svg"></div></div>
        
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
    renderBgCategoryShowTask(index);
}


function showEditTask(i) {
    // currentOpenTask = i;
    showAddTaskOverlay();
    document.getElementById('overlayTask').classList.add('d-none');
    document.getElementById('divider').classList.add('d-none');
    document.getElementById('mainAddTask').classList.remove('d-flex');
    document.getElementById('addTaskForm').classList.remove('containerTasks');
    document.getElementById('addTaskForm').classList.remove('overlay');
    document.getElementById('addTaskForm').classList.add('overlayEdit');
    // document.getElementById('BTN').classList.add('d-none');
    document.getElementById('BTN-save').classList.remove('d-none');
    document.getElementById('totalInput').style = `display: block`;
    document.getElementById('inputUnit').classList.add('d-none');
    createSaveButton(i);
    loadTheTaskContent(i);
    setToggleID(i);
    renderSubtasks(i);
    readPrio(i);

}

function createSaveButton(i) {
    document.getElementById('BTN').innerHTML = `<button class="btn" id="ok" onclick="saveExistingTask(${i})">Ok<img src=""></button>`;
}

function getbgColor(index) {
    if (tasks[index].priority == 'urgent') {
        document.getElementById('prioPic').classList.add('invert');
        document.getElementById('priority').classList.add('red');
    }


    else if (tasks[index].priority == 'medium') {
        document.getElementById('prioPic').classList.add('invert');
        document.getElementById('priority').classList.add('orange');
    }

    else if (tasks[index].priority == 'low') {
        document.getElementById('prioPic').classList.add('invert');
        document.getElementById('priority').classList.add('green');
    }

}

function closeTask() {
    document.getElementById('makeBgDarker').classList.add('d-none');
    document.getElementById('overlayTask').classList.add('d-none');
    document.getElementById('editTask').classList.add('d-none');
    showTasksOnBoard();


    //  renderContactsOnBoard(currentOpenTask, tasks[currentOpenTask])
}

function showAssigned(element) {
    console.log(element.assignedTo);
    for (let index = 0; index < element.assignedTo.length; index++) {

        if (element.assignedTo[index].check == "checked") {
            // let id = element.assignedTo[index];
            document.getElementById('assign').innerHTML += `<div class="row"><div class="bigNameCircle bg${contacts[index].color}">${contacts[index].initials}</div> <div>${contacts[index].firstname} ${contacts[index].lastname}</div></div>`;
        }
    }
}


function loadTheTaskContent(i) {

    title.value = tasks[i].title;
    description.value = tasks[i].description;
    selectedCategory.textContent = tasks[i].category;
    document.getElementById('dueDate').value = tasks[i].duedate;
    prio = tasks[i].priority;
    subtasks = tasks[i].subtasks;
    renderContactsAssignBoard(i);
}


function saveExistingTask(i) {
    // let assignedTo = getAssignedToUser();
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    // let category = document.getElementById('selectedCategory');
    // let duedate = document.getElementById('dueDate');
    let task = {
        'id': i,
        'status': tasks[i].status,
        'title': title.value,
        'description': description.value,
        'duedate': dueDate.value,
        'priority': prio,
        'assignedTo': getAssignedContacts(),
        'category': tasks[i].category,
        'subtasks': getExistingSubtasks(i)
    }
    tasks[i] = task;
    saveTasks();
    document.getElementById('addTaskForm').classList.add('d-none');
    showTask(i)
    clearInputFields(title, description, dueDate);
    currentOpenTask = -1;
}

function clearInputFields(title, description, dueDate) {
    title.value = '';
    description.value = '';
    dueDate.value = getTodayDate();
    subtasks = [];

}
function getExistingSubtasks(i) {
    data = tasks[i].subtasks.length;
    if (data < subtasks_namen.length) data = subtasks_namen.length;
    new_subtasks = [];
    for (let index = 0; index < data; index++) {
        let subtask = {
            'subtaskName': document.getElementById(`input${index}`).value,
            'check': document.getElementById(`input${index}`).checked
        }
        console.log(subtask);
        new_subtasks.push(subtask);
    }
    console.log(new_subtasks);
    return new_subtasks;

}



function showExistingSubtasks(i) {
    if (tasks[i].subtasks.length > 0) {

        tasks[i].subtasks.forEach((element, j) => {
            document.getElementById('displaySubtasks').innerHTML += `
  <div class="wrapper">
  <input type="checkbox" name="subtask" value="${element.subtaskName}" id="input${j}">
  <label for="subtask">${element.subtaskName}</label>
</div>`;
        });

    }
}

function readPrio(i) {
    console.log('prio', i);
    if (tasks[i].priority == 'urgent') renderUrgentHTML();
    else if (tasks[i].priority == 'medium') renderMediumHTML();
    else if (tasks[i].priority == 'low') renderLowHTML();

}


function closeIt() {
    document.getElementById('editTask').classList.add('d-none');
    document.getElementById('makeBgDarker').classList.add('d-none');
    document.getElementById('addTaskForm').classList.add('d-none');
    subtasks_namen = [];
}


function setDarkLayer() {
    document.getElementById('makeBgDarker').classList.add('d-none');
}


function renderUrgentHTML() {
    document.getElementById('prioButtons').innerHTML = ``;
    document.getElementById('prioButtons').innerHTML +=
        ` <button onclick="selectButton(0)" class="buttonPrio red" id="urgent">Urgent<img id="picurgent"
    src="assets/img/urgent.svg" style="filter:brightness(0) invert(1)"></button>
    <button onclick="selectButton(1)" class="buttonPrio" id="medium">Medium<img id="picmedium"
    src="assets/img/medium.svg"></button>
    <button onclick="selectButton(2)" class="buttonPrio" id="low">Low<img id="piclow"
    src="assets/img/low.svg"></button>`
}
function renderMediumHTML() {
    document.getElementById('prioButtons').innerHTML = ``;
    document.getElementById('prioButtons').innerHTML += ` <button onclick="selectButton(0)" class="buttonPrio" id="urgent">Urgent<img id="picurgent"
    src="assets/img/urgent.svg"></button>
    <button onclick="selectButton(1)" class="buttonPrio orange" id="medium">Medium<img id="picmedium"
    src="assets/img/medium.svg" style="filter:brightness(0) invert(1)"></button>
    <button onclick="selectButton(2)" class="buttonPrio" id="low">Low<img id="piclow"
    src="assets/img/low.svg"></button>`
}
function renderLowHTML() {
    document.getElementById('prioButtons').innerHTML = ``;
    document.getElementById('prioButtons').innerHTML += ` <button onclick="selectButton(0)" class="buttonPrio" id="urgent">Urgent<img id="picurgent"
    src="assets/img/urgent.svg"></button>
    <button onclick="selectButton(1)" class="buttonPrio" id="medium">Medium<img id="picmedium"
    src="assets/img/medium.svg"></button>
    <button onclick="selectButton(2)" class="buttonPrio green" id="low">Low<img id="piclow"
    src="assets/img/low.svg" style="filter:brightness(0) invert(1)"></button>`
}

function renderSubtasks(i) {
    console.log('checkSubtasks');
    document.getElementById('displaySubtasks').innerHTML = ``;
    let subs = tasks[i].subtasks;

    let ch = ``;
    for (let index = 0; index < subs.length; index++) {
        const element = subs[index];

        if (element.check) ch = 'checked';

        document.getElementById('displaySubtasks').innerHTML += `
      <div class="wrapper">
        <input id="input${index}" type="checkbox" name="subtask" value="${element.subtaskName}" ${ch} >
        <label for="subtask">${element.subtaskName}</label>
      </div>`;
        ch = '';
    }

}


function showAddTaskOverlay() {
    showDarkOverlay();
    document.getElementById('addTaskForm').classList.remove('d-none');
    // renderCategriesAndContacts();
}

function closeItToo() {
    document.getElementById('flyingAddTask').classList.add('d-none');
    document.getElementById('makeBgDarker').classList.add('d-none');
}


function showDarkOverlay() {
    document.getElementById('makeBgDarker').classList.remove('d-none');
}

function filterTasks() {
    let search = document.getElementById('search').value;
    search.toLowerCase();

    let regex = new RegExp(search);
    let content = document.getElementById('cols');
    let boxes = content.querySelectorAll('.box');

    for (let i = 0; i < boxes.length; i++) {
        let title = boxes[i].querySelector('.title').innerHTML;
        let description = boxes[i].querySelector('.description').innerHTML;

        if (regex.test(title.toLowerCase()) || regex.test(description.toLowerCase())) {
            boxes[i].style.display = 'flex';
        } else {
            boxes[i].style.display = 'none';
        }
    }
}


window.addEventListener("resize", function () {  // closes the basket-Layer above 700px if user doesn`t do it
    if (this.window.matchMedia("(max-width: 500px)").matches) {
          this.document.getElementById('createTaskBTN_area').innerHTML = `<img src="assets/img/addTaskMobile.svg" onclick="showAddTaskOverlay()">`;
    }

    else {
        this.document.getElementById('createTaskBTN_area').innerHTML = `<button class="btn" id="createTaskBTN" onclick="showAddTaskOverlay()">Add Task</button>`;
    }
})



