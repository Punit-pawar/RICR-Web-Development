function TaskAdd() {
    const task = document.getElementById("NewTask").value.trim();
    
    console.log(task);

    if(task){
        const l = document.createElement("li");
        l.classList.add("p-2", "d-flex", "align-items-center", "border-bottom");

        const d = document.createElement("div");
        d.classList.add("w-75");
        d.innerText = task;

        const b = document.createElement("button");
        b.classList.add("btn", "btn-outline-danger","ms-3");
        b.innerHTML = `<i class="bi bi-trash"> Delete`;
        b.onclick = ()=> {
            l.remove();
        };


        l.appendChild(d);
        l.appendChild(b);

        document.getElementById("TaskList").appendChild(l);

        document.getElementById("NewTask").value="";
    }


}
