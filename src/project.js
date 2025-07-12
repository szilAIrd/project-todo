// import {Page} from './dom.js'
// import {mainPage} from './index.js'

class Project {
    static all = []

    constructor(title){
        this.title = title;
        this.todos = []
        Project.all.push(this)
        this.id = crypto.randomUUID()
    }
    static createProject(title){
        if ((Project.all.find((element)=>(element.title)==title))==undefined){
            console.log(Project.all)
            let newProject = new Project(title)
            // Page.updateSelectOptions()
            
            return newProject
        }
        else {
           console.log('Project name is taken')
        }
    }

    static deleteProject(title){
        let projectID = (Project.all.find((element)=>(element.title)==title))
        if (projectID!=undefined){
            Project.all.splice(projectID,1)
            console.log(Project.all)
        }
    }

    static editProjectTitle(oldTitle, newTitle){
        // Find the index of the project in the the projects array and change the title
        Project.all[Project.all.findIndex((element)=>(element.title)==oldTitle)].title = newTitle
    }
    // createProject(){}
    addTodo(todo){
        // This needs refining: dont know yet how i will give the todo object as an input
        this.todos.push(todo)
    }

  


    
}

function createProject(){
    let newProject = Project.createProject('new project')
    console.log(Project.all)
    return newProject
}

let defaultProject = new Project('Default')
// console.log(['The default project is', defaultProject])
// let Project1 = new Project('Project1')


export { Project, defaultProject, createProject}