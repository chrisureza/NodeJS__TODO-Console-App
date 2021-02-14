require('colors');

const {
    inquirerMenu,
    pause,
    readInput,
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
        }

        saveData(JSON.stringify(tasks.getTasksList));

        opt !== '0' && await pause();

    } while (opt !== '0');
};

main();