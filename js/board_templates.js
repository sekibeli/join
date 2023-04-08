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

function testRenderNewTaskHTML(){
    return `
    <div class="containerAddTaskLeftSide">
    <div class="inputUnit">
        <label for="name">Title</label>
        <input id="title" onfocus="hideMissingText('missingTitle')" class="input" type="text" placeholder="Enter a title">
               </div>
    <div class="missingInfoText d-none" id="missingTitle">Please enter a title</div>

    <div class="inputUnit">
        <label for="description">Description</label>
        <textarea id="description" onfocus="hideMissingText('missingDescription')" class="inputDescription" type="textarea"
            placeholder="Enter a Description"></textarea>
                    </div>
    <div class="missingInfoText d-none" id="missingDescription">Please enter a discription </div>
    
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
    <div class="missingInfoText d-none" id="missingCategory">Please choose a category</div>
    <div class="missingInfoText d-none" id="missingColorspot">Please choose a category color and name</div>
    <div class="inputUnit">
        <label>Assigned to</label>
        <div class="inputArea" id="toggleID">
            <div id="selected">Assigned to</div>
            <img src="assets/img/openMenuIcon.svg" onclick="toggleOptionsAss()" alt="">
        </div>
        <div id="see" class="d-none">
            <div class="options" id="optionsUser"></div>
        </div>
                </div>
    <div class="missingInfoText d-none" id="missingContact">Please select one ore more contacts for this task</div>
    <div id="showAssignedPeople"></div>
</div>
<div class="divider" id="divider"></div>
<div class="containerAddTaskRightSide">
    <div class="inputUnit">
        <label for="dueDate">Due Date</label>
        <input id="dueDate" class="input" type="date" required>
    </div>
    <div class="inputUnit">
        <label for="prio">Prio</label>
        <div class="prioButtons" id="prioButtons">
            <button onclick="selectButton(0)" class="buttonPrio" id="urgent">Urgent<img id="picurgent"
                    src="assets/img/urgent.svg"></button>
            <button onclick="selectButton(1)" class="buttonPrio" id="medium">Medium<img id="picmedium"
                    src="assets/img/medium.svg"></button>
            <button onclick="selectButton(2)" class="buttonPrio" id="low">Low<img id="piclow"
                    src="assets/img/low.svg"></button>
        </div>
              </div>
    <div class="missingInfoText d-none" id="missingPrio">Select a priority</div>
    <div class="inputUnit">
        <label for="subtask">Subtasks</label>
        <input id="subtask" class="input" type="text" placeholder="Add new subtask">
        <div class="plus"><img src="assets/img/plus.svg" onclick="addSubtask()" alt=""></div>
    </div>
    <div id="displaySubtasks"></div>


    <div class="BTN" id="BTN">
        <button onclick="closeIt()" class="btn light" id="clearBTN">Cancel<img src=""></button>
        <button class="btn" id="createTaskBTN_task" onclick="addTask()">Create Task<img src=""></button>
    </div>
    <div class="BTN" id="BTN-save"></div>


</div>

</div>`

}