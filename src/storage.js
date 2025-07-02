


function saveData(project){
    localStorage.clear()
    project.forEach(element => {
        let saveData = JSON.stringify(element)
        localStorage.setItem(element.title, saveData)   
    });
}

function loadData(){
    // Get data from localStorage

    let loadedData = JSON.parse(localStorage.getItem())
    

    // Create Project object using the obtained data from localStorage
    console.log(loadedData)

    return loadedData
}   



export {saveData, loadData}