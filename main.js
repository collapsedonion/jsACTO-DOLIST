
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

for(let i = 0; i < taskList.length; i++){
    taskList[i].pToTask = createTask(taskList[i].task,taskList[i].checked, false);
    if(taskList[i].checked){
        taskList[i].pToTask.querySelector("span").classList.add("checked");
    }
}



function removeItem(element){
    for (let i = 0;i < taskList.length; i++) {
        if(taskList[i].pToTask === element.parentElement){
            taskList.splice(i);
            break;
        }
    }
    element.parentElement.remove();
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function checkboxEvent(checkbox){
    if(checkbox.checked){
        checkbox.parentElement.querySelector("span").classList.add("checked");
        for (let i = 0;i < taskList.length; i++) {
            if(taskList[i].pToTask === checkbox.parentElement){
                taskList[i].checked = true;
                break;
            }
        }
    }
    else {
        checkbox.parentElement.querySelector("span").classList.remove("checked");
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].pToTask === checkbox.parentElement) {
                taskList[i].checked = false;
                break;
            }

        }
    }
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function createTask(text, checked = false, createO = true){
    let newTask = document.createElement("li");

    let toAdd = document.createElement("input");
    toAdd.type = "checkbox";
    toAdd.addEventListener("change",function () {
        checkboxEvent(this);
    });
    toAdd.checked = checked;
    newTask.append(toAdd);

    toAdd = document.createElement("span");
    toAdd.className = "task";
    toAdd.innerHTML = String(text);
    newTask.append(toAdd);

    toAdd = document.createElement("button");
    toAdd.className = "delete-btn";
    toAdd.innerHTML = "X";
    toAdd.addEventListener("click", function () {
        removeItem(this);
    })
    newTask.append(toAdd);

    let list = document.getElementById("task-list");
    list.append(newTask);

    if(createO) {
        let o = {
            task: text,
            checked: false,
            pToTask: newTask
        }

        taskList.push(o);
        localStorage.setItem("tasks", JSON.stringify(taskList));
    }
    return newTask;
}


document.getElementById("add-task-button").addEventListener("click", function (){
    let text = document.getElementById("input-task").value;
    if(String(text).length > 0){
        createTask(text);
    }
})



