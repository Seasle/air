import { select } from '../db.js';
import { getColumns } from '../utils/getColumns.js';

export default (fastify, options, done) => {
    fastify.get('/:name', async (request, reply) => {
        const data = await select(`SELECT * FROM SYS.${request.params.name}`);
        const columns = data.length > 0 ? getColumns(data[0]) : [];

        reply.send({ data, columns });
    });

    done();
};
