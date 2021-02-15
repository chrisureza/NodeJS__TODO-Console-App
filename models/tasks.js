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

    showTask(task, index) {
        const { desc, createdAt } = task;
        const taskIndex = `${index + 1}.`.green;
        const taskDescription = desc;
        const taskStatus = `${createdAt ? 'Completed'.green : 'Pending'.red}.`;

        console.log(`${taskIndex} ${taskDescription} :: ${taskStatus}`);
    }

    listTasks() {
        const tasks = this.getTasksList;
        console.log();
        tasks.forEach((task, index) => {
            this.showTask(task, index);
        });
    }

    listCompletedTasks() {
        const tasks = this.getTasksList;
        console.log();
        console.log('Completed tasks:\n'.green);
        tasks.forEach((task, index) => {
            const { createdAt } = task;
            createdAt && this.showTask(task, index);
        });
    }

    listPendingTasks() {
        const tasks = this.getTasksList;
        console.log();
        console.log('Pending tasks:\n'.red);
        tasks.forEach((task, index) => {
            const { createdAt } = task;
            !createdAt && this.showTask(task, index);
        });
    }
}

module.exports = Tasks;