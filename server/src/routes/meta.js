import { select } from '../db.js';
import { groupBy, mergeBy } from '../utils/collections.js';

export default (fastify, options, done) => {
    fastify.get('/allowed', async (request, reply) => {
        const data = await select('SELECT * FROM SYS.ALLOWED');
        const normalized = mergeBy(
            data.map(entry => ({
                tableName: entry.tableName,
                select: entry.selectPriv,
                insert: entry.insertPriv,
                update: entry.updatePriv,
                delete: entry.deletePriv,
            })),
            entry => entry.tableName
        );

        reply.send(normalized);
    });

    fastify.get('/columns', async (request, reply) => {
        const data = await select('SELECT * FROM SYS.COLUMNS');
        const normalized = groupBy(data, entry => entry.tableName);

        reply.send(normalized);
    });

    done();
};
