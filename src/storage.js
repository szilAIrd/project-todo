


function saveData(project){
    // convert data: use stringiy
    let saveData = JSON.stringify(project)
    console.log(saveData)

    localStorage.setItem(`Project1`, saveData)
    let transformedData = loadData(saveData)

    let returnedData = localStorage.getItem(`Project1`)
    console.log(['The returned data si',JSON.parse(returnedData)])

    console.log(['The tranformed data is', transformedData.title])
    return [saveData,transformedData]
    // save data into local storage
}

function loadData(dataToLoad){

    let loadedData = JSON.parse(localStorage.getItem(dataToLoad))

    console.log(loadedData)
    return loadedData
}   



export {saveData, loadData}