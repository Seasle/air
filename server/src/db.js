import oracledb from 'oracledb';
import { create } from './config.js';
import { mapper } from './utils/mapper.js';

let connection = null;

export const connect = async (userName, password) => {
    try {
        connection = await oracledb.getConnection(
            create({
                user: userName,
                password,
            })
        );
    } catch (error) {
        return error;
    }
};

export const disconnect = async () => {
    try {
        await connection.close();

        connection = null;
    } catch (error) {
        return error;
    }
};

export const select = async (...args) => {
    try {
        const result = await connection.execute(...args);
        const combined = result.rows.map(entry =>
            mapper(entry.map((value, index) => [result.metaData[index].name, value]))
        );

        return combined;
    } catch (error) {
        return error;
    }
};

export const execute = async (...args) => {
    try {
        const result = await connection.execute(...args);

        return result;
    } catch (error) {
        return error;
    }
};
