import { Document } from 'mongodb';
import { Book } from 'src/types';

export interface ItemDocument extends Book, Document {}

export const CollectionNames = {
  Books: 'books',
};
