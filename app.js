require('colors');

const { showMenu, pause } = require('./helpers/messages');

console.clear();

const main = async () => {
    let opt = '';

    do {
        opt = await showMenu();
        opt !== '0' && await pause();
    } while (opt !== '0');
};

main();