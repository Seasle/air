import { connect, disconnect } from '../db.js';

const defaultUser = {
    name: null,
    password: null,
};

export default (fastify, options, done) => {
    fastify.get('/', async (request, reply) => {
        reply.send(request.session.user || defaultUser);
    });

    fastify.post('/', async (request, reply) => {
        if (request.body !== null) {
            const error = await connect(request.body.name, request.body.password);

            if (error === undefined) {
                request.session.user = {
                    name: request.body.name,
                    password: request.body.password,
                };

                reply.send(request.session.user);
            } else {
                console.error(error);

                reply.session(defaultUser);
            }
        } else {
            reply.send(request.session.user || defaultUser);
        }
    });

    fastify.get('/logout', async (request, reply) => {
        await disconnect();

        request.session.user = null;

        reply.send(defaultUser);
    });

    done();
};
