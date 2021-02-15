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
	console.log('      Select an option'.white);
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

const readInput = async (message) => {
	const question = [
		{
			type: 'input',
			name: 'desc',
			message,
			validate(value) {
				return value.length ? true : 'please type a value';
			}
		}
	];

	const { desc } = await inquirer.prompt(question);
	return desc;
};

const tasksListToDelete = async (tasks = []) => {
	const choices = tasks.map((task, index) => {
		const { id, desc } = task;
		const taskIndex = `${index + 1}.`.green;
		return {
			value: id,
			name: `${taskIndex} ${desc}`
		};
	});
	choices.unshift({
		value: '0',
		name: '0. '.green + 'Cancel'
	});
	const { id } = await inquirer.prompt({
		type: 'list',
		name: 'id',
		message: 'Delete task: ',
		choices
	});
	return id;
};

const tasksListToComplete = async (tasks = []) => {
	const choices = tasks.map((task, index) => {
		const { id, desc } = task;
		const taskIndex = `${index + 1}.`.green;
		return {
			value: id,
			name: `${taskIndex} ${desc}`,
			checked: (task.completedAt),
		};
	});
	const { ids } = await inquirer.prompt({
		type: 'checkbox',
		name: 'ids',
		message: 'Select the task(s) to complete: ',
		choices
	});
	return ids;
};

const confirm = async (message) => {
	const question = {
		type: 'confirm',
		name: 'ok',
		message,
	};

	const { ok } = await inquirer.prompt(question);
	return ok;
};

module.exports = {
	inquirerMenu,
	pause,
	readInput,
	tasksListToDelete,
	tasksListToComplete,
	confirm
};