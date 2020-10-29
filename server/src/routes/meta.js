import { select } from '../db.js';

export default (fastify, options, done) => {
    fastify.get('/allowed', async (request, reply) => {
        const data = await select('SELECT * FROM SYS.ALLOWED');

        reply.send(data);
    });

    done();
};
