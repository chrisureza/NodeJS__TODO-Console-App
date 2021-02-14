const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
require('colors');

const questions = [
	{
		type: 'list',
		name: 'option',
		message: 'What you want to do?',
		choices: [
			{
				value: '1',
				name: `${'1.'.green} Add task`
			},
			{
				value: '2',
				name: `${'2.'.green} List all tasks`
			},
			{
				value: '3',
				name: `${'3.'.green} List completed task`
			},
			{
				value: '4',
				name: `${'4.'.green} List pending task`
			},
			{
				value: '5',
				name: `${'5.'.green} Complete task(s)`
			},
			{
				value: '6',
				name: `${'6.'.green} Delete task`
			},
			{
				value: '0',
				name: `${'0.'.green} Exit`
			},
		]
	}
];

const inquirerMenu = async () => {
	console.clear();
	console.log('============================='.green);
	console.log('      Select an option'.green);
	console.log('=============================\n'.green);

	const { option } = await inquirer.prompt(questions);

	return option;
};

const pause = async () => {
	const inputQuestion = [
		{
			type: 'input',
			name: 'enter',
			message: `Perss ${'ENTER'.green} to continue`

		}
	];
	console.log('\n');
	await inquirer.prompt(inputQuestion);
};

module.exports = {
	inquirerMenu,
	pause
};