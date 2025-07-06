import {Project} from './project.js'


function saveData(project){
    localStorage.clear()
    project.forEach((element) => {
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
        let title = dataToLoad.title
        let project = Project.createProject(title)
        project.todos = []
        project.id = dataToLoad.id
    }
}

// function loadTodos(){
    
// }

loadData()



export {saveData, loadProjectEntry}