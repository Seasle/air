import oracledb from 'oracledb';

export const create = entries => ({
    connectString: process.env.CONNECTION_STRING,
    ...entries,
});

export default {
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectString: process.env.CONNECTION_STRING,
    privilege: oracledb[process.env.PRIVILEGE],
};
