import { select } from '../db.js';
import { groupBy } from '../utils/collections.js';

export default (fastify, options, done) => {
    fastify.get('/allowed', async (request, reply) => {
        const data = await select('SELECT * FROM SYS.ALLOWED');

        reply.send(data);
    });

    fastify.get('/columns', async (request, reply) => {
        const data = await select('SELECT * FROM SYS.COLUMNS');

        reply.send(groupBy(data, entry => entry.tableName));
    });

    done();
};
