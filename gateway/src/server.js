import fastify from 'fastify';
import proxy from 'fastify-http-proxy';
import { log, from, to } from './utils.js';

const server = fastify();

const defineProxy = (upstream, prefix = '/', rewritePrefix = prefix) => {
    server.register(proxy, {
        upstream,
        prefix,
        rewritePrefix,
        preHandler: (request, reply, done) => {
            log(from(request.url), '->', to(upstream));

            done();
        },
    });
};

defineProxy(process.env.CLIENT, process.env.CLIENT_PREFIX);
defineProxy(process.env.SERVER, process.env.SERVER_PREFIX);

server.listen(process.env.PORT, process.env.HOSTNAME, () => {
    log(`Сервер запущен http://${process.env.HOSTNAME}:${process.env.PORT}/`);
});
