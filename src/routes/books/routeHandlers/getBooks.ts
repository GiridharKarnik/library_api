import { CollectionNames } from 'src/database/types';
import {
  FastifyRequest,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';
import { GetBooksQueryParams } from '../books.schema';

export const getBooks: RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  { Querystring: GetBooksQueryParams }
> = async function (
  request: FastifyRequest<{
    Querystring: GetBooksQueryParams;
  }>,
  reply
) {
  //? extract the query parameters from the request
  const { isbn, title, author, status } = request.query;

  const booksCollection = this.mongo.db?.collection(CollectionNames.Books);

  if (!booksCollection) {
    await reply.code(500).send({ error: 'error while trying to read from the database' });
    return;
  }

  try {
    const query = {
      ...(isbn && { isbn }),
      ...(title && { title }),
      ...(author && { author }),
      ...(status && { status }),
    };

    //? by default find the books which are available to be borrowed
    const books = await booksCollection.find(query).toArray();

    if (books) {
      await reply.code(200).send(books);
    } else {
      await reply.code(404).send({ error: 'No books found' });
    }
  } catch (error) {
    console.error(error);

    await reply.code(500).send({ error: 'error while trying to read books in the database' });
  }
};
