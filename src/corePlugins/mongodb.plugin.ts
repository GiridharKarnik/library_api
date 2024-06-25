import { FastifyInstance } from 'fastify';

export const mongodb = async (server: FastifyInstance) => {
  const url = process.env.MONGODB_URI;

  await server.register(import('@fastify/mongodb'), {
    url,
    forceClose: true,
  });

  console.log('mongodb connection established');
};
