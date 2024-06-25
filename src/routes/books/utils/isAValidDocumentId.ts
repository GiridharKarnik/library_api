import { BSON } from 'mongodb';

export const isAValidDocumentId = (id?: string): boolean => {
  return id !== undefined && BSON.ObjectId.isValid(id);
};
