import chalk from 'chalk';

const now = () => new Date().toLocaleTimeString('ru-RU');

export const log = (...args) => {
    console.log(chalk.green(`[${now()}]`), ...args);
};

export const from = value => chalk.bgYellow.black(value);

export const to = value => chalk.bgCyan.black(value);
