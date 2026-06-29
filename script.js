let taskData={}

const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
let dragElement = null;
console.log(todo, progress, done);

const tasks = document.querySelectorAll('.task');

tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
        //console.log("draging",e);
        dragElement = task;
    });
});




function addDragEventsOnColumn(Column) {
    Column.addEventListener("dragenter", (e) => {
        e.preventDefault();

        Column.classList.add("hover-over");
    })

    Column.addEventListener("dragleave", (e) => {
        e.preventDefault();

        Column.classList.remove("hover-over");
    })


    Column.addEventListener("dragover", (e) => {
        e.preventDefault();
    })

    Column.addEventListener("drop", (e) => {
        e.preventDefault();
        console.log("droped", dragElement, Column);
        Column.appendChild(dragElement);
        Column.classList.remove("hover-over");

        [todo, progress, done].forEach(col => {
            const tasks = col.querySelectorAll(".task");
            const count = col.querySelector(".right");
            count.innerText = tasks.length;
        })
    })

}
addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done)

const toggleModelBtn = document.querySelector('#toggle-modal');
const modalbg = document.querySelector(".modal .bg");
const modal = document.querySelector('.modal');
const addTaskBtn = document.querySelector("#add-new-task");

toggleModelBtn.addEventListener("click", () => {
    modal.classList.toggle("active")
})

modalbg.addEventListener("click", () => {
    modal.classList.remove("active")
})

addTaskBtn.addEventListener("click", () => {

    const taskTitle = document.querySelector("#task-tital").value;
    const taskdesc = document.querySelector("#task-desc").value;

    if (taskTitle === "" || taskdesc === "") {
        alert("Please fill all fields");
        return;
    }

    const div = document.createElement("div");

    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `<h2>${taskTitle}</h2>
                     <p>${taskdesc}</p>
                     <button>delete</button>`;


    todo.appendChild(div);

    [todo, progress, done].forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");
      taskData[ col.id ] = Array.from(tasks).map(t=>{
        return{
            title:t.querySelector("h2").innerText,
            desc:t.querySelector("p").innerText
        }
      })
      console.log(taskData);

        count.innerText = tasks.length;
    })

    div.addEventListener("drag", (e) => {
        dragElement = div;
    })

    modal.classList.remove("active");
});
