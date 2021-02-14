const Task = require("./task");

class Tasks {
    constructor() {
        this._tasksList = {};
    }

    addTask(desc = '') {
        const task = new Task(desc);

        this._tasksList[task.id] = task;

    }
}

module.exports = Tasks;