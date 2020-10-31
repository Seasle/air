import { select } from '../db.js';

export default (fastify, options, done) => {
    fastify.get('/flights', async (request, reply) => {
        const data = await select(
            `SELECT *
            FROM (
                SELECT FLIGHT_NUMBER AS VALUE
                FROM SYS.FLIGHT
                WHERE FLIGHT_NUMBER LIKE :STARTS||'%'
            )
            WHERE ROWNUM <= 50`,
            [request.query.start || '']
        );
        const normalized = data.map(entry => entry.value);

        reply.send(normalized);
    });

    done();
};
