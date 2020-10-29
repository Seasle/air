import fastify from 'fastify';
import cors from 'fastify-cors';
import cookie from 'fastify-cookie';
import caching from 'fastify-caching';
import session from 'fastify-server-session';
import user from './routes/user.js';
import meta from './routes/meta.js';

const server = fastify();

server.register(cors);
server.register(cookie);
server.register(caching);
server.register(session, {
    secretKey: process.env.SECRET,
    sessionMaxAge: 30 * 24 * 60 * 60 * 1000,
});
server.register(
    (fastify, options, done) => {
        fastify.register(user, { prefix: 'user' });
        fastify.register(meta, { prefix: 'meta' });

        done();
    },
    { prefix: 'api' }
);

server.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`Сервер запущен http://${process.env.HOSTNAME}:${process.env.PORT}/`);
});
