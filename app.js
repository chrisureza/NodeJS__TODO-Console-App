require('colors');

const {
    inquirerMenu,
    pause,
    readInput,
    tasksListToDelete,
    confirm,
    tasksListToComplete,
} = require('./helpers/inquirer');
const { saveData, readData } = require('./helpers/dataInteractions');
const Tasks = require('./models/tasks');


const main = async () => {
    let opt = '';
    const tasks = new Tasks();

    const tasksData = readData();
    if (tasksData) tasks.loadTasksFromArray(tasksData);

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await readInput('Task description:');
                tasks.addTask(desc);
                console.log('Task added'.green);
                break;
            case '2':
                tasks.listTasks();
                break;
            case '3':
                tasks.listCompletedTasks();
                break;
            case '4':
                tasks.listPendingTasks();
                break;
            case '5':
                const ids = await tasksListToComplete(tasks.getTasksList);
                tasks.toggleCompleted(ids);
                break;
            case '6':
                const id = await tasksListToDelete(tasks.getTasksList);
                if (id !== '0') {
                    const deleteConfirmation = await confirm('Are you sure?');
                    if (deleteConfirmation) {
                        tasks.deleteTask(id);
                        console.log('Task deleted');
                    }
                }
                break;
        }

        saveData(JSON.stringify(tasks.getTasksList));

        opt !== '0' && await pause();

    } while (opt !== '0');
};

main();