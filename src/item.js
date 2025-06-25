class todoItem{
    constructor(title, description, dueDate, priority, notes, checkList){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checkList = checkList;
    }

    createItem(){}

    deleteItem(){}

    setItemFinished(){}

    setItemPriority(){}

    setItemDueDate(){}

    copyItem(){}
}

export {todoItem}