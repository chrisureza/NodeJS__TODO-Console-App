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

    deleteTask(id = '') {
        if (this._tasksList[id]) {
            delete this._tasksList[id];
        }
    }

    loadTasksFromArray(tasks = []) {
        tasks.forEach(task => this._tasksList[task.id] = task);
    }

    showTask(task, index) {
        const { desc, completedAt } = task;
        const taskIndex = `${index + 1}.`.green;
        const taskDescription = desc;
        const taskStatus = `${completedAt ? `Completed :: ${completedAt}`.green : 'Pending'.red}.`;

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
            const { completedAt } = task;
            completedAt && this.showTask(task, index);
        });
    }

    listPendingTasks() {
        const tasks = this.getTasksList;
        console.log();
        console.log('Pending tasks:\n'.red);
        tasks.forEach((task, index) => {
            const { completedAt } = task;
            !completedAt && this.showTask(task, index);
        });
    }

    toggleCompleted(ids = []) {
        ids.forEach(id => {
            const task = this._tasksList[id];
            if (!task.completedAt) {
                task.completedAt = new Date().toISOString();
            }
        });

        this.getTasksList.forEach(task => {
            const { id } = task;
            if (!ids.includes(id)) {
                const task = this._tasksList[id];
                task.completedAt = null;
            }
        });
    }
}

module.exports = Tasks;