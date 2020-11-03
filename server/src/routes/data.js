import { select, execute } from '../db.js';
import { getColumns } from '../utils/getColumns.js';
import { ISO_DATE } from '../constants/expressions.js';

const prepareValue = value => {
    if (ISO_DATE.test(value)) {
        return new Date(Date.parse(value));
    } else {
        return value;
    }
};

export default (fastify, options, done) => {
    fastify.post('/', async (request, reply) => {
        const { name, page = 0, size = 10, order, direction = 'DESC' } = request.body;
        const total = await select(`SELECT COUNT(*) AS TOTAL FROM SYS.${name}`);
        const data = await select(`
            SELECT * FROM (
                SELECT T.*, ROWNUM ROW_NUM
                FROM SYS.${name} T
                WHERE ROWNUM <= ${(page + 1) * size}
                ORDER BY ${order || 'ROWNUM'} ${direction}
            ) RESULT_SET
            WHERE RESULT_SET.ROW_NUM > ${page * size}
        `);
        const columns = data.length > 0 ? getColumns(data[0]) : [];

        reply.send({ ...total[0], data, columns });
    });

    fastify.post('/insert', async (request, reply) => {
        const { table, columns, values } = request.body;
        const keys = columns.map(column => `:${column}`);
        const orderedValues = columns.map(column => prepareValue(values[column]));
        const data = await execute(
            `INSERT INTO SYS.${table} (${columns.join(', ')})
            VALUES (${keys.join(', ')})`,
            orderedValues,
            { autoCommit: true }
        );

        reply.send(data);
    });

    fastify.post('/update', async (request, reply) => {
        const { id, table, columns, values } = request.body;
        const pairs = columns.map(column => `${column} = :${column}`);
        const orderedValues = columns.map(column => prepareValue(values[column]));
        const data = await execute(
            `UPDATE SYS.${table}
            SET ${pairs.join(', ')}
            WHERE ID = :ID`,
            [...orderedValues, id],
            { autoCommit: true }
        );

        reply.send(data);
    });

    fastify.post('/delete', async (request, reply) => {
        const { table, id } = request.body;
        const data = await execute(`DELETE FROM SYS.${table} WHERE ID = :ID`, [id], {
            autoCommit: true,
        });

        reply.send(data);
    });

    done();
};
