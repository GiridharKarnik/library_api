import { beforeEach, describe, expect, test, vi } from 'vitest';
import { updateBookStatus } from '../updateBookStatus';

const mockFastifyInstance: any = {
  mongo: {
    db: { collection: vi.fn() },
  },
};

const mockSend = vi.fn();

const mockReply: any = {
  code: vi.fn(() => {
    return {
      send: mockSend,
    };
  }),
};

describe('updateBookStatus', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  test('should return 400 if the id is invalid', async () => {
    const mockRequest: any = {
      params: {
        id: 'invalid_id',
      },
      body: {
        status: 'CheckedOut',
      },
    };

    await updateBookStatus.call(mockFastifyInstance, mockRequest, mockReply);

    expect(mockReply.code).toBeCalledWith(400);
    expect(mockSend).toBeCalledWith({ error: 'invalid_id is an invalid id' });
  });

  test('should return 400 if the status is invalid', async () => {
    const mockRequest: any = {
      params: {
        id: '667ac86b394b519c8a8db60d',
      },
      body: {
        status: 'InvalidStatus',
      },
    };

    await updateBookStatus.call(mockFastifyInstance, mockRequest, mockReply);

    expect(mockReply.code).toBeCalledWith(400);
    expect(mockSend).toBeCalledWith({ error: 'Invalid status' });
  });

  test('should return 500 if there is an error while trying to read from the database', () => {
    const mockRequest: any = {
      params: {
        id: '667ac86b394b519c8a8db60d',
      },
      body: {
        status: 'checked-out',
      },
    };

    mockFastifyInstance.mongo.db.collection.mockImplementationOnce(() => null);

    updateBookStatus.call(mockFastifyInstance, mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith({ error: 'error while trying to read from the database' });
  });

  test('should return 404 if the book with the given id is not found', async () => {
    const mockRequest: any = {
      params: {
        id: '667ac86b394b519c8a8db60d',
      },
      body: {
        status: 'checked-out',
      },
    };

    const mockCollection = {
      findOne: vi.fn(() => null),
    };

    mockFastifyInstance.mongo.db.collection.mockImplementationOnce(() => mockCollection);

    await updateBookStatus.call(mockFastifyInstance, mockRequest, mockReply);

    expect(mockReply.code).toBeCalledWith(404);
    expect(mockSend).toBeCalledWith({ error: 'book with id 667ac86b394b519c8a8db60d was not found' });
  });

  test('should return 400 if the user tries to check out a book that is already checked out', async () => {
    const mockRequest: any = {
      params: {
        id: '667ac86b394b519c8a8db60d',
      },
      body: {
        status: 'checked-out',
      },
    };

    const mockCollection = {
      findOne: vi.fn(() => ({ status: 'checked-out' })),
    };

    mockFastifyInstance.mongo.db.collection.mockImplementationOnce(() => mockCollection);

    await updateBookStatus.call(mockFastifyInstance, mockRequest, mockReply);

    expect(mockReply.code).toBeCalledWith(400);
    expect(mockSend).toBeCalledWith({ error: 'book is already checked out' });
  });

  test('should return 400 if the user tries to check out a reference book', async () => {
    const mockRequest: any = {
      params: {
        id: '667ac86b394b519c8a8db60d',
      },
      body: {
        status: 'checked-out',
      },
    };

    const mockCollection = {
      findOne: vi.fn(() => ({ status: 'available', referenceBook: true })),
    };

    mockFastifyInstance.mongo.db.collection.mockImplementationOnce(() => mockCollection);

    await updateBookStatus.call(mockFastifyInstance, mockRequest, mockReply);

    expect(mockReply.code).toBeCalledWith(400);
    expect(mockSend).toBeCalledWith({ error: 'reference books cannot be checked out' });
  });
});
