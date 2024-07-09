import { jest } from '@jest/globals';
import CoreController  from '../../controllers/core.controller.js';
import CoreDatamapper from '../../datamappers/core.datamapper.js';
import ApiError from '../../errors/api.errors.js';

jest.mock('../../datamappers/core.datamapper.js', () => ({
  getAll: jest.fn(),
  getOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

const mockRequest = (body) => ({
  body,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();

describe ('CoreController', () => {
  beforeAll(() => {
    CoreController.mainDatamapper = CoreDatamapper;
  });
  // Test pour la méthode getAll
  describe('getAll', () => {
    test('should return all records', async () => {
      const req = mockRequest();
      const res = mockResponse();

      // Mock pour CoreDatamapper.findAll
      CoreDatamapper.findAll = jest.fn().mockResolvedValue([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
      ]);

      await CoreController.getAll(req, res, mockNext);

      expect(CoreDatamapper.findAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
      ]);
    });
  });
});
