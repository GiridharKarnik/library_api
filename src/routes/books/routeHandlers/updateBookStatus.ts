import { CollectionNames } from 'src/database/types';
import { ObjectId } from '@fastify/mongodb';
import { RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault, RouteHandlerMethod } from 'fastify';
import { UpdateBookStatusQueryParams, UpdateBookStatusRequestBody } from '../books.schema';

import { isAValidBookStatus } from '../utils/isAValidStatusUpdate';
import { isAValidDocumentId } from '../utils/isAValidDocumentId';
import { BookStatus } from 'src/types';

export const updateBookStatus: RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  { Params: UpdateBookStatusQueryParams; Body: UpdateBookStatusRequestBody }
> = async function (request, reply) {
  const { id } = request.params;
  const newStatus = request.body.status;

  if (!isAValidDocumentId(id)) {
    await reply.code(400).send({ error: `${id} is an invalid id` });
    return;
  }

  if (!isAValidBookStatus(newStatus)) {
    await reply.code(400).send({ error: 'Invalid status' });
    return;
  }

  const booksCollection = this.mongo.db?.collection(CollectionNames.Books);

  if (!booksCollection) {
    await reply.code(500).send({ error: 'error while trying to read from the database' });
    return;
  }

  try {
    const bookToUpdate = await booksCollection.findOne({ _id: new ObjectId(id) });

    if (!bookToUpdate) {
      await reply.code(404).send({ error: `book with id ${id} was not found` });
      return;
    }

    if (newStatus === BookStatus.CheckedOut && bookToUpdate.status === BookStatus.CheckedOut) {
      await reply.code(400).send({ error: 'book is already checked out' });
      return;
    }

    if (bookToUpdate.referenceBook) {
      await reply.code(400).send({ error: 'reference books cannot be checked out' });
      return;
    }

    const updatedBook = await booksCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { status: newStatus } },
      { returnDocument: 'after' }
    );

    await reply.code(200).send(updatedBook);
  } catch (error) {
    await reply.code(500).send({ error: 'error while trying to update the book status in the database' });
  }
};
