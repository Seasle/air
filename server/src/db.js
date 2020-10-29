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

export const select = async expression => {
    try {
        const result = await connection.execute(expression);
        const combined = result.rows.map(entry =>
            mapper(entry.map((value, index) => [result.metaData[index].name, value]))
        );

        return combined;
    } catch (error) {
        return error;
    }
};

connection;

// from draft/mapper.js
// const mapper = data =>
//     Object.fromEntries(
//         (Array.isArray(data) ? data : Object.entries(data)).map(([key, value]) => [
//             key
//                 .toLowerCase()
//                 .replace(/([-_][a-z])/g, group => group.toUpperCase().replace(/[-_]/g, '')),
//             value,
//         ])
//     );

// const run = async () => {
//     console.log(config);
//     let connection;

//     try {
//         connection = await oracledb.getConnection(config);

//         const result = await connection.execute(`
//             SELECT *
//             FROM Place
//         `);

//         console.log(result.metaData);
//         console.log(result.rows);

//         const combined = result.rows.map(entry =>
//             mapper(entry.map((value, index) => [result.metaData[index].name, value]))
//         );
//         console.log(combined);
//     } catch (err) {
//         console.error(err);
//     } finally {
//         if (connection) {
//             try {
//                 await connection.close();
//             } catch (err) {
//                 console.error(err);
//             }
//         }
//     }
// };

// run();
