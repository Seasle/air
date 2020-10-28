import oracledb from 'oracledb';
import config from './config.js';

// from draft/mapper.js
const mapper = data =>
    Object.fromEntries(
        (Array.isArray(data) ? data : Object.entries(data)).map(([key, value]) => [
            key
                .toLowerCase()
                .replace(/([-_][a-z])/g, group => group.toUpperCase().replace(/[-_]/g, '')),
            value,
        ])
    );

const run = async () => {
    console.log(config);
    let connection;

    try {
        connection = await oracledb.getConnection(config);

        const result = await connection.execute(`
            SELECT *
            FROM Place
        `);

        console.log(result.metaData);
        console.log(result.rows);

        const combined = result.rows.map(entry =>
            mapper(entry.map((value, index) => [result.metaData[index].name, value]))
        );
        console.log(combined);
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
};

run();
