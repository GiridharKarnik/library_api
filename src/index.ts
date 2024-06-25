import Fastify from 'fastify';
import cors from '@fastify/cors';
import fp from 'fastify-plugin';
import { swagger, mongodb } from './corePlugins';
import { booksRoute } from './routes';

import { customCompiler } from 'src/ajvCompiler';

const fastify = Fastify({
  logger: true,
});

void (async () => {
  fastify.setValidatorCompiler(customCompiler);

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(fp(swagger));
  await fastify.register(fp(mongodb));

  await fastify.register(booksRoute);

  const port = Number(process.env.PORT) || 3030;

  const host = process.env.HOST || '0.0.0.0';

  const start = async () => {
    try {
      await fastify.listen({ port, host });
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };

  await start();

  process.on('SIGINT', function () {
    void (async () => {
      await fastify.close();
    })();
    process.exit(0);
  });
})();
