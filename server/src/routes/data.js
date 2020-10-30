import { select } from '../db.js';
import { getColumns } from '../utils/getColumns.js';

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

    done();
};
