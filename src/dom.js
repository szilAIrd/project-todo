import {Todo} from './item.js'
import {Project,defaultProject,createProject} from './project.js'

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
                const newTodo = Todo.createTodo('fasza'); 
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
            selectProjectBtn.appendChild(exisitngProject)})

        // sidebar.appendChild(selectProjectBtn)
        
        // selectProject
        

        // DISPLAY PROJECT

        const displayProjectBtn = document.createElement('button');
        displayProjectBtn.id = 'display-project-btn';
        displayProjectBtn.addEventListener('click', Page.displayProject)
        sidebar.appendChild(displayProjectBtn)
        

    }

    static displayProject(){
        // this.body
        const maincontent = document.getElementById('maincontent')
        const project = document.createElement('div')
        project.classList = 'project'
        project.textContent = defaultProject.title
        maincontent.appendChild(project)
        

       
        
    }
}

class DomTodo{

    // addTodoBtn(){
    //     const addTodoBtn = document.createElement('button')
    //     const body = document.body

        
    // }
}


export {DomTodo, Page}