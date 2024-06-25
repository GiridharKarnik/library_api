import { FastifyInstance, RegisterOptions } from 'fastify';
import { GetBooksSchema, UpdateBookStatusSchema } from './books.schema';

import { getBooks } from './routeHandlers/getBooks';
import { updateBookStatus } from './routeHandlers/updateBookStatus';

export const booksRoute = (server: FastifyInstance, _: RegisterOptions, done: () => void) => {
  server.get('/book', { schema: GetBooksSchema }, getBooks);

  server.put('/book/:id/status', { schema: UpdateBookStatusSchema }, updateBookStatus);

  done();
};
