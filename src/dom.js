import {Todo} from './todo.js'
import {Project,defaultProject,createProject} from './project.js'
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
                const newTodo = Todo.createTodo('new todo'); 
                console.log(newTodo); 
                defaultProject.addTodo(newTodo)
                console.log(defaultProject)
            })
        sidebar.appendChild(addTodoBtn)


        //  ADD NEW PROJECT

        const addProjectBtn = document.createElement('button')
        addProjectBtn.id  = 'add-project-btn'
        addProjectBtn.textContent = 'Add new project'
        addProjectBtn.addEventListener('click',createProject)
        addProjectBtn.addEventListener('click', ()=>{
            const selectProjectBtn = document.getElementById('projects-select')
            const newProject = document.createElement('option')
            newProject.value = 'new project'
            newProject.textContent = 'new project'
            selectProjectBtn.appendChild(newProject)
        })
        sidebar.appendChild(addProjectBtn)

        // SAVE PROJECT
        const saveProjectBtn = document.createElement('button')
        saveProjectBtn.id  = 'save-project-btn'
        saveProjectBtn.textContent = 'Save project'
        saveProjectBtn.addEventListener('click',saveData(Project.all))
        sidebar.appendChild(saveProjectBtn)

        // SELECT PROJECT
        const selectProjectBtn = document.createElement('select')
        selectProjectBtn.name = 'projects-select';
        selectProjectBtn.id = 'projects-select';
        let options = Project.all
        console.log(options)
        options.forEach((element)=> {
            const exisitngProject = document.createElement('option')
            exisitngProject.value = element.title
            exisitngProject.textContent = element.title
            if (element.title==='Default'){exisitngProject.selected = true}
            selectProjectBtn.appendChild(exisitngProject)})
        selectProjectBtn.addEventListener('change', Page.displayProject)    
        
        sidebar.appendChild(selectProjectBtn)

        
        // selectProject
        

        // DISPLAY PROJECT    
        // const displayProjectBtn = document.createElement('button');
        // displayProjectBtn.id = 'display-project-btn';
        // displayProjectBtn.addEventListener('click', Page.displayProject)
        // sidebar.appendChild(displayProjectBtn)
        

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
        maincontent.appendChild(project) 
    }

    static clearMainContent(){
        const maincontent = document.getElementById('maincontent')
        if (maincontent.childElementCount>0){
            const children = maincontent.children
            maincontent.removeChild(children[0])
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
        }
    })
    // Page.clearMainContent()
    
    maincontent.appendChild(newProjectTitle)
}

    // displayTodo

export {DomTodo, Page}