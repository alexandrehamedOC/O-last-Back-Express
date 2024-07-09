import { jest } from '@jest/globals';
import CoreController  from '../../controllers/core.controller.js';
import CoreDatamapper from '../../datamappers/core.datamapper.js';
import ApiError from '../../errors/api.errors.js';

jest.mock('../../datamappers/core.datamapper.js', () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

const mockRequest = (params = {}, body = {}) => ({
  params,
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
  //test pour la méthode getOne
  describe( 'getOne', () => {
    test('should return one record by Id', async () => {
      const req = mockRequest({ id: 1 });
      const res = mockResponse();

      // Mock pour CoreDatamapper.findByPk
      CoreDatamapper.findByPk = jest.fn().mockResolvedValue({ id: 1, name: 'John Doe' });

      await CoreController.getOne(req, res, mockNext);

      expect(CoreDatamapper.findByPk).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'John Doe' });
    });
  });
  // Test pour la méthode create
  describe('create', () => {
    test('should create a new record', async () => {
      const req = mockRequest({}, { name: 'John Doe' });
      const res = mockResponse();

      // Mock pour CoreDatamapper.create
      CoreDatamapper.create.mockResolvedValue({ id: 1, name: 'John Doe' });

      await CoreController.create(req, res, mockNext);

      expect(CoreDatamapper.create).toHaveBeenCalledWith({ name: 'John Doe' });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'John Doe' });
    });

    test('should handle errors during creation', async () => {
      const req = mockRequest({}, { name: 'John Doe' });
      const res = mockResponse();

      // Mock pour CoreDatamapper.create pour lancer une erreur
      CoreDatamapper.create.mockRejectedValue(new Error('Database error'));

      await CoreController.create(req, res, mockNext);

      expect(CoreDatamapper.create).toHaveBeenCalledWith({ name: 'John Doe' });
      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
    });

    test('should handle incomplete input', async () => {
      const req = mockRequest({}, {});
      const res = mockResponse();

      await CoreController.create(req, res, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
    });
  });
});
