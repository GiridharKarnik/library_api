import { FastifyInstance } from 'fastify';

export const swagger = async (server: FastifyInstance) => {
  await server.register(import('@fastify/swagger'));

  await server.register(import('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
  });
};
