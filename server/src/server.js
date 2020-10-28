import fastify from 'fastify';

const server = fastify();

server.get('/api/:id', async (request, reply) => {
    reply.send(request.params);
});

server.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`Сервер запущен http://${process.env.HOSTNAME}:${process.env.PORT}/`);
});
