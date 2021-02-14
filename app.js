require('colors');

const {
    inquirerMenu,
    pause,
    readInput,
} = require('./helpers/inquirer');
const Tasks = require('./models/tasks');


const main = async () => {
    let opt = '';
    const tasks = new Tasks();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await readInput('Task description:');
                tasks.addTask(desc);
                console.log('Task added'.green);
                break;
            case '2':
                console.log(tasks._tasksList);
                break;
        }

        opt !== '0' && await pause();

    } while (opt !== '0');
};

main();