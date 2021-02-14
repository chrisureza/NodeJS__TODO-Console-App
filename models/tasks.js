require('colors');

const Task = require("./task");

class Tasks {
    constructor() {
        this._tasksList = {};
    }

    get getTasksList() {
        const list = [];
        Object.keys(this._tasksList).forEach(key => {
            const task = this._tasksList[key];
            list.push(task);
        });
        return list;
    }

    addTask(desc = '') {
        const task = new Task(desc);

        this._tasksList[task.id] = task;

    }

    loadTasksFromArray(tasks = []) {
        tasks.forEach(task => this._tasksList[task.id] = task);
    }

    listTasks() {
        const tasks = this.getTasksList;
        console.log();
        tasks.forEach((task, index) => {
            const { desc, createdAt } = task;
            const taskIndex = `${index + 1}.`.green;
            const taskDescription = desc;
            const taskStatus = `${createdAt ? 'Completed'.green : 'Pending'.red}.`;

            console.log(`${taskIndex} ${taskDescription} :: ${taskStatus}`);
        });
    }
}

module.exports = Tasks;