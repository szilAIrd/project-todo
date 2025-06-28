import { prototype } from 'html-webpack-plugin';
// import {format} from './index.js'

class Todo{
    constructor(title){
        //  description, dueDate, priority, notes, checkList=[]
        this.title = title;
        this.description = '';
        this.dueDate = ''
        // dueDate;
        this.priority = '' 
        // priority;
        this.notes = ''
        // notes;
        this.checkList =  ''
        // checkList;
        this.statusFinished = ''
        // false
    }

    // createItem(){} creating 

    // deleteItem(){}
    static createTodo(title){
        
        return new Todo(title)
        
    }

    setTodoStatus(){
        this.statusFinished = !this.statusFinished
    }

    setTodoPriority(priority){
        if (priority === 1 || priority === 2 || priority === 3 || priority === 4){
        this.priority = priority;}
        else{
            alert("Wrong input!")
        }
    }

    setTodoDueDate(date){
        if (date instanceof Date){
            this.dueDate = date;   
        }  
        else {
            alert("Wrong input format")
        }
    }

    setTodoNote(text){
        this.note = text 
    }

    // copyItem(){}
}

// function createTodo(){
//     return new Todo(title)
// }

export { Todo }