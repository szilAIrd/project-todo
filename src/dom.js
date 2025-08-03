import {Todo} from './todo.js'
import {Project,defaultProject} from './project.js'
import {saveData,loadData} from './storage.js'

class Page{
    body = document.body;
    initPage(){

        // MAIN LAYOUT: consists sidebar and main content
        const body = document.body;
        const sidebar = document.createElement('div')
        sidebar.id = 'sidebar'

        const maincontent = document.createElement('div')
        maincontent.id = 'maincontent'
        
        body.appendChild(sidebar)
        body.appendChild(maincontent)

        // SIDEBAR  
        const sidebarTitle = document.createElement('div')
        sidebarTitle.textContent = 'Menu'
        sidebarTitle.id = 'sidebar-title'
        sidebar.appendChild(sidebarTitle)
        //  ADD NEW TODO BUTTON
        const addTodoBtn = document.createElement('button')
        addTodoBtn.id = 'add-todo-btn';
        addTodoBtn.textContent = 'Add Todo'
        addTodoBtn.addEventListener('click', ()=> {
                let newTodo = Todo.createTodo('new todo'); 
                console.log(newTodo); 
                //  Add todo to currently displayed project
                // Get name of the currently displayed project from DOM, i.e.'Default'
                let selectedProject = document.getElementsByClassName('project')[0]
                //  
                let selectedProjectTitle = selectedProject.textContent
                let selectedProjectIdx = Project.all.findIndex((element) => (element.title==selectedProjectTitle))
                // Add todo to selecte project
                let project = Project.all[selectedProjectIdx]
                project.addTodo(newTodo)

                Page.displayProject()
                // defaultProject.addTodo(newTodo)
                console.log(Project.all)
                // displayTodo()
            })
        sidebar.appendChild(addTodoBtn)


        //  ADD NEW PROJECT

        const addProjectBtn = document.createElement('button')
        addProjectBtn.id  = 'add-project-btn'
        addProjectBtn.textContent = 'Add new project'
        addProjectBtn.addEventListener('click',()=>{Project.createProject('new project')})
        addProjectBtn.addEventListener('click', Page.updateSelectOptions)
        sidebar.appendChild(addProjectBtn)

        //  DELETE PROJECT

        const deleteProjectBtn = document.createElement('button')
        deleteProjectBtn.id  = 'add-project-btn'
        deleteProjectBtn.textContent = 'Delete project'
        // deleteProjectBtn.addEventListener('click',()=>{Project.deleteProject})
        deleteProjectBtn.addEventListener('click',()=>{
            let toBeDeleted = document.getElementsByClassName('project')[0]
            Project.deleteProject(toBeDeleted.textContent)
            Page.clearMainContent()
        })
        deleteProjectBtn.addEventListener('click', Page.updateSelectOptions)
        sidebar.appendChild(deleteProjectBtn)

        // SAVE PROJECT
        const saveProjectBtn = document.createElement('button')
        saveProjectBtn.id  = 'save-project-btn'
        saveProjectBtn.textContent = 'Save projects'
        saveProjectBtn.addEventListener('click',saveData)
        sidebar.appendChild(saveProjectBtn)

        // SELECT PROJECT
        const selectProjectLabel = document.createElement('label')
        selectProjectLabel.id = 'select-label'
        selectProjectLabel.for = 'projects-select'
        selectProjectLabel.textContent = 'Select a project'
        const selectProjectBtn = document.createElement('select')
        selectProjectBtn.name = 'projects-select';
        selectProjectBtn.id = 'projects-select';
        // selectProjectBtn.addEventListener('click', Page.updateSelectOptions)
        selectProjectBtn.addEventListener('change', Page.displayProject) 

        // selectProjectBtn.addEventListener('change', (e)=>{console.log(e)}) 
           
        sidebar.appendChild(selectProjectLabel)
        sidebar.appendChild(selectProjectBtn)

        
        // selectProject
        

        // DISPLAY PROJECT    
        // const displayProjectBtn = document.createElement('button');
        // displayProjectBtn.id = 'display-project-btn';
        // displayProjectBtn.addEventListener('click', Page.displayProject)
        // sidebar.appendChild(displayProjectBtn)
        

    }

    static updateSelectOptions(){
        let options = Project.all
        const selectProjectBtn = document.getElementById('projects-select')
        console.log(options)

        while (selectProjectBtn.firstChild) {
        selectProjectBtn.removeChild(selectProjectBtn.firstChild);
        }

        options.forEach((element)=> {
        const exisitngProject = document.createElement('option')
        exisitngProject.value = element.title
        exisitngProject.textContent = element.title
        let selectedProject = document.getElementsByClassName('project')[0]
        try {if (selectedProject =! undefined && element.title == selectedProject.textContent){
            exisitngProject.selected = true
        }}
        catch{}

        selectProjectBtn.appendChild(exisitngProject)})

    }


    static displayProject(){
        // this.body
        const maincontent = document.getElementById('maincontent')
        const selectProjectBtn = document.getElementById('projects-select')
        Page.clearMainContent()
        const project = document.createElement('div')
        project.setAttribute('type', 'text')
        project.classList = 'project'
        // get selectec Project object based on the select button
        let selectedProject = Project.all.find((element) => element.title == selectProjectBtn.value)
        project.textContent = selectedProject.title
        project.addEventListener('dblclick', editProjectTitle)
        // Display all the todos the selected project contains in its todos array
        

        maincontent.appendChild(project) 
        for (let i=0;i<selectedProject.todos.length;i++)
            {
                displayTodo(selectedProject.todos[i])
            }   
    }

    static clearMainContent(){
        const maincontent = document.getElementById('maincontent')
        const children = maincontent.children

        if (maincontent.childElementCount>0){
            while (maincontent.childElementCount>0){
                maincontent.removeChild(maincontent.firstChild)
            }
        }
    }
}

    

// function displayTodo(todoItem, project){
//     //  take one single todo from a project and add it to the dom
//      let todoDom = document.createElement('div')
//     // todo.id = project.id;
//     // const
//     let selectedProject = Project.all.find((element) => element.title == selectProjectBtn.value)

//     todoDom.textContent = selectedProject.todos[0].title
//     project.appendChild(todo)
// }


class DomTodo{

    // addTodoBtn(){
    //     const addTodoBtn = document.createElement('button')
    //     const body = document.body

        
    // }
}

function displayProjectsSelector(){
    const selectProjectBtn = document.getElementById('projects-select')
    const addProject = document.createElement('option')
    // addProject.id = 
    addProject.value = 'new project'
    addProject.textContent = 'new project'
    selectProjectBtn.appendChild(addProject)
}

function displayTodo(todo){
    let maincontent = document.getElementById('maincontent')
    // let project = document.getElementsByClassName('project')[0]
    let todoInput = document.createElement('input')
    
    todoInput.addEventListener('input', (e) => {
        let currentProject = document.getElementsByClassName('project')[0].textContent
        let project = Project.all.find(element => element.title == currentProject)
        let todoId = e.currentTarget.parentElement.id
        let currentTodo = project.todos.find(element => element.id == todoId)
        currentTodo.statusFinished = e.currentTarget.checked
        console.log(currentTodo)
    })
    todoInput.className = 'todo-checkbox'
    let todoLabel = document.createElement('label')
    let todoElement = document.createElement('div')
    let todoDueDate = document.createElement('input')
    let todoSetPrio = document.createElement('select')
    let todoSetPrioOption1 = document.createElement('option')
    todoSetPrioOption1.textContent = 1
    todoSetPrioOption1.value = 1
    if (todo.priority == todoSetPrioOption1.value){
        todoSetPrioOption1.selected=true
    }
    let todoSetPrioOption2 = document.createElement('option')
    todoSetPrioOption2.textContent = 2
    todoSetPrioOption2.value = 2
    if (todo.priority == todoSetPrioOption2.value){
        todoSetPrioOption2.selected=true
    }
    let todoSetPrioOption3 = document.createElement('option')
    todoSetPrioOption3.textContent = 3
    todoSetPrioOption3.value = 3
    if (todo.priority == todoSetPrioOption3.value){
        todoSetPrioOption3.selected=true
    }
    let todoSetPrioOption4 = document.createElement('option')
    todoSetPrioOption4.textContent = 4
    todoSetPrioOption4.value = 4
    if (todo.priority == todoSetPrioOption4.value){
        todoSetPrioOption4.selected=true
    }

    

    todoSetPrio.addEventListener('input', (e) =>{
        // Take prio value from UI element and set background color 
        let todo = e.currentTarget.parentElement.children[1]
        todo.style.backgroundColor = setPrioColor(e.currentTarget.value)
        
        
        // Pass prio value to todo object
        let currentProject = document.getElementsByClassName('project')[0].textContent
        let project = Project.all.find(element => element.title == currentProject)
        let todoId = e.currentTarget.parentElement.id
        let currentTodo = project.todos.find(element => element.id == todoId)
        currentTodo.priority = e.currentTarget.value
    })

    todoSetPrio.appendChild(todoSetPrioOption1)
    todoSetPrio.appendChild(todoSetPrioOption2)
    todoSetPrio.appendChild(todoSetPrioOption3)
    todoSetPrio.appendChild(todoSetPrioOption4)
    todoSetPrio.style.display = 'none'

    todoDueDate.type = 'date'
    todoDueDate.addEventListener('input', (e)=> {
        // take the input from the dom element and set the value in the todo item
        let currentProject = document.getElementsByClassName('project')[0].textContent
        let project = Project.all.find(element => element.title == currentProject)
        let todoId = e.currentTarget.parentElement.id
        let currentTodo = project.todos.find(element => element.id == todoId)
        currentTodo.dueDate = e.currentTarget.value
        console.log(currentTodo)
    })
    
    todoElement.id = todo.id

    let todoNotes = document.createElement('textarea')
    todoNotes.rows = 4
    todoNotes.cols = 20
    todoNotes.textContent = todo.note
    todoNotes.placeholder = 'Add notes'
    todoNotes.addEventListener('keydown',(e)=>{
        if (e.key === 'Enter') {
        let currentProject = document.getElementsByClassName('project')[0].textContent
        let project = Project.all.find(element => element.title == currentProject)
        let todoId = e.currentTarget.parentElement.id
        let currentTodo = project.todos.find(element => element.id == todoId)
        currentTodo.note = e.currentTarget.value
        console.log(currentTodo)
        }
    })
    todoNotes.style.display = 'none'


    todoLabel.textContent = todo.title
    todoLabel.for = todo.title.toLowerCase()
    todoLabel.addEventListener('dblclick',editTodoTitle)
    todoInput.type = 'checkbox'
    todoInput.id = todoLabel.for
    todoInput.value = todoInput.id
    todoDueDate.value = todo.dueDate
    // Set todo element background color accoridng to priority defined by Eisenhower matrix *
    // .q1 { background-color: #e74c3c; }  /* Urgent + Important */
    // .q2 { background-color: #27ae60; }  /* Not Urgent + Important */
    // .q3 { background-color: #f1c40f; }  /* Urgent + Not Important */
    // .q4 { background-color: #95a5a6; }  /* Not Urgent + Not Important */
    function setPrioColor(priority){
        let color
        if(priority == 1){
            color = '#e74c3c' 
        }
        else if(priority == 2){
            color = '#27ae60' 
        }
        else if(priority == 3){
            color = '#f1c40f' 
        }
        else if(priority == 4){
            color = '#95a5a6' 
        }
        else{}
        return color
    }
    todoLabel.style.backgroundColor = setPrioColor(todo.priority)

    let todoShow = document.createElement('div')
    todoShow.textContent = 'show'
    todoShow.className = 'todo-show'
    todoShow.addEventListener('click',e =>{
        if (e.currentTarget.textContent=='hide'){
            e.currentTarget.parentElement.children[4].style.display='none'
            e.currentTarget.parentElement.children[5].style.display='none'
            e.currentTarget.textContent='show'}
        else if (e.currentTarget.textContent=='show'){
            e.currentTarget.parentElement.children[4].style.display='block'
            e.currentTarget.parentElement.children[5].style.display='block'
            e.currentTarget.textContent='hide'}
        else{}
        
    })

    
    todoInput.checked = todo.statusFinished
    todoElement.id = todo.id
    todoElement.classList = 'todo'
    todoElement.appendChild(todoInput)
    todoElement.appendChild(todoLabel)
    todoElement.appendChild(todoDueDate)
    todoElement.appendChild(todoSetPrio)
    todoElement.appendChild(todoNotes)
    todoElement.insertBefore(todoShow,todoElement.children[2])

    maincontent.appendChild(todoElement)
    
}


function editProjectTitle(){
    const maincontent = document.getElementById('maincontent')
    let projectTitle = document.getElementsByClassName('project')[0]
    projectTitle.style.display = 'none';
    let currentProjectTitle = projectTitle.value;
    let newProjectTitle = document.createElement('input')
    newProjectTitle.id = 'editNameInput'
    newProjectTitle.placeholder = projectTitle.textContent

    newProjectTitle.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
        let oldTitle = document.getElementById('editNameInput').placeholder
        projectTitle.textContent = newProjectTitle.value
          const children = maincontent.children
        //   Page.clearMainContent()
        newProjectTitle.style.display = 'none'
        projectTitle.style.display = ''
        maincontent.appendChild(projectTitle)
        console.log(Project.all)
        Project.editProjectTitle(oldTitle, newProjectTitle.value)
        console.log(Project.all)
        newProjectTitle.remove()
        Page.updateSelectOptions()
        }
    })
    // Page.clearMainContent()
    
    maincontent.appendChild(newProjectTitle)
}

function editTodoTitle(e){
    const maincontent = document.getElementById('maincontent')
    let todoTitle = e.currentTarget
    todoTitle.style.display = 'none'
    let todoId = e.currentTarget.parentElement.id
    // change todo html element text content: 
    // 1) remove label dom element and add input, when clicked enter add label back with the text input
    // 2) trigger todo object title change: id needed, it can be obtained from the label parent element
    // let currentTodoTitle = projectTitle.value;
    let newTodoTitle = document.createElement('input')
    newTodoTitle.id = 'newTodoTitle'
    newTodoTitle.placeholder = 'Add new todo name'

    newTodoTitle.addEventListener('keydown', function (e){
        if (e.key === 'Enter'){
            todoTitle.textContent = newTodoTitle.value;
            todoTitle.style.display = ''
            parentElement.removeChild(newTodoTitle)
            // trigger change in project objects todo object
            // find the todo based on id
            let projectTitle  = document.getElementsByClassName('project')[0].textContent
            // invoke the functionality: but pass only the id and the new name
            let relProject = (Project.all.find(element => element.title == projectTitle))
            // Project.all()
            // let relProject = Project.all[projectIdx]
            let relTodo = relProject.todos.find(element => element.id == todoId)
            relTodo.title = todoTitle.textContent
            console.log(Project.all)
        }
        

}

    )

    let parentElement = e.currentTarget.parentElement
    // parentElement.appendChild(newTodoTitle)
    parentElement.insertBefore(newTodoTitle, parentElement.children[1])


}



export {DomTodo, Page}