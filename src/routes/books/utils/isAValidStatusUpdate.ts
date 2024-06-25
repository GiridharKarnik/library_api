import { BookStatus } from 'src/types';

export const isAValidBookStatus = (status: BookStatus): boolean => {
  return status === BookStatus.Available || status === BookStatus.CheckedOut;
};
