import oracledb from 'oracledb';

export default {
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectString: process.env.CONNECTION_STRING,
    privilege: oracledb[process.env.PRIVILEGE],
};
