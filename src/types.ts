import { BSON } from 'mongodb';

export enum BookStatus {
  CheckedOut = 'checked-out',
  Available = 'available',
}

export interface Book {
  _id: BSON.ObjectId;
  isbn: string;
  title: string;
  author: string;
  status: BookStatus;
  referenceBook?: boolean;
}
