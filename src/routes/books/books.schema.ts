import { JTDDataType } from 'ajv/dist/jtd';
import { BookStatus } from 'src/types';

export interface GetBooksQueryParams {
  isbn?: string;
  title?: string;
  author?: string;
  status?: BookStatus;
}

export const GetBooksQueryParamsSchema: JTDDataType<GetBooksQueryParams> = {
  type: 'object',
  required: [],
  properties: {
    isbn: { type: 'string' },
    title: { type: 'string' },
    author: { type: 'string' },
    status: { type: 'string' },
  },
};

export const GetBooksSchema = {
  querystring: GetBooksQueryParamsSchema,
};

export interface UpdateBookStatusQueryParams {
  id: string;
}

export interface UpdateBookStatusRequestBody {
  status: BookStatus;
}

export const UpdateBookStatusQueryParamsSchema: JTDDataType<UpdateBookStatusQueryParams> = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string' },
  },
};

export const UpdateBookStatusRequestBodySchema: JTDDataType<UpdateBookStatusRequestBody> = {
  type: 'object',
  required: ['status'],
  properties: {
    status: { type: 'string' },
  },
};

export const UpdateBookStatusSchema = {
  params: UpdateBookStatusQueryParamsSchema,
  body: UpdateBookStatusRequestBodySchema,
};
