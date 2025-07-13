import {Project} from './project.js'
import {Todo} from './todo.js'


function saveData(){
    localStorage.clear()
    Project.all.forEach((element) => {
        let saveData = JSON.stringify(element)
        localStorage.setItem(element.title, saveData)   
    });
}

function loadProjectEntry(itemToLoad){
    // input: localStorage.key(0) = 'Default'
    // output: title, todos, id
    // Get get which item from localStorage and return the values needed to create a Project object
    // itemToLoad = 
    let dataToLoad = JSON.parse(localStorage.getItem(itemToLoad));
    
    return dataToLoad
} 

function loadData(){
    for (let i=0;i<localStorage.length;i++){
        // Iterate through the elements of localStorage and create objects
        let dataToLoad = loadProjectEntry(localStorage.key(i))
        //  create object
        let Todos = dataToLoad.todos
        let title = dataToLoad.title
        let project = Project.createProject(title)
        if (Todos!=[]){
        for (let i=0;i<Todos.length; i++){
            project.todos.push(loadTodos(Todos[i]))
        }
        }
        function loadTodos(todoToLoad){
            let loadTodo = Todo.createTodo(todoToLoad.title)
            loadTodo.id = todoToLoad.id
            return loadTodo

        }
        // project.todos = 
        // project.todos = dataToLoad.todos
        // project.id = dataToLoad.id
    }
}

// function loadTodos(){
    
// }

loadData()
console.log(Project.all)



export {saveData, loadProjectEntry}