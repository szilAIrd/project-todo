class Project {
    static all = []

    constructor(title){
        this.title = title;
        this.todos = []
        Project.all.push(this)
        this.id = crypto.randomUUID()
    }
    static createProject(title){

        return new Project(title)
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
let Project1 = new Project('Project1')


export { Project, defaultProject, createProject}