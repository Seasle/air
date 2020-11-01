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

    fastify.get('/places', async (request, reply) => {
        const data = await select(
            `SELECT *
            FROM (
                SELECT
                    SYS.PLACE_TYPE.NAME AS PLACE_TYPE,
                    SYS.AIRPLANE_PLACES.PLACE
                FROM SYS.AIRPLANE_PLACES
                INNER JOIN SYS.PLACE_TYPE
                ON SYS.AIRPLANE_PLACES.PLACE_TYPE_ID = SYS.PLACE_TYPE.ID
                INNER JOIN SYS.FLIGHT
                ON SYS.AIRPLANE_PLACES.AIRPLANE_ID = SYS.FLIGHT.AIRPLANE_ID
                WHERE
                    SYS.FLIGHT.FLIGHT_NUMBER = :FLIGHT_NUMBER AND
                    SYS.AIRPLANE_PLACES.PLACE NOT IN (
                        SELECT PLACE
                        FROM SYS.PASSENGERS
                        WHERE SYS.PASSENGERS.FLIGHT_NUMBER = :FLIGHT_NUMBER
                    ) AND
                    SYS.AIRPLANE_PLACES.PLACE LIKE '%'||:STARTS||'%'
                ORDER BY TO_NUMBER(REGEXP_SUBSTR(SYS.AIRPLANE_PLACES.PLACE, '\\d+')), REGEXP_SUBSTR(SYS.AIRPLANE_PLACES.PLACE, '^\\D*')
            )
            WHERE ROWNUM <= 50`,
            [request.query.flight || '', request.query.flight || '', request.query.start || '']
        );

        reply.send(data);
    });

    done();
};
