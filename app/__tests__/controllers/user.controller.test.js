import { jest } from '@jest/globals';
import UserController  from '../../controllers/user.controller.js';
import UserDatamapper from '../../datamappers/user.datamapper.js';
import ApiError from '../../errors/api.errors.js';

jest.mock('../../datamappers/user.datamapper.js', () => ({
  
  createUser: jest.fn(),
  findByEmail: jest.fn(),
  findUser: jest.fn(),
  userDetails: jest.fn(),
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

describe('UserController', () => {
  // Test pour la méthode createAccount
  describe('createAccount', () => {
    it('should create a new user account with status 201', async () => {
      const req = mockRequest({
        firstname: 'John',
        lastname: 'Doe',
        email: 'newuser@example.com',
        password: 'password',
        city: 'New York',
        birth_date: '1990-01-01',
      });
      const res = mockResponse();

      // Mock pour UserDatamapper.findByEmail et UserDatamapper.createUser
      UserDatamapper.findByEmail = jest.fn().mockResolvedValue(null);
      UserDatamapper.createUser = jest.fn().mockResolvedValue({
        id: 'new_user_id',
        firstname: 'John',
        lastname: 'Doe',
        email: 'newuser@example.com',
        city: 'New York',
        birth_date: '1990-01-01',
      });

      await UserController.createAccount(req, res, mockNext);

      expect(UserDatamapper.findByEmail).toHaveBeenCalledWith('newuser@example.com');
      expect(UserDatamapper.createUser).toHaveBeenCalledWith({
        firstname: 'John',
        lastname: 'Doe',
        email: 'newuser@example.com',
        password: 'password',
        city: 'New York',
        birth_date: '1990-01-01',
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 'new_user_id',
        firstname: 'John',
        lastname: 'Doe',
        email: 'newuser@example.com',
        city: 'New York',
        birth_date: '1990-01-01',
      });
    });
    it('should handle errors during account creation', async () => {
      const req = mockRequest({
        firstname: 'John',
        lastname: 'Doe',
        email: 'newuser@example.com',
        password: 'password',
        city: 'New York',
        birth_date: '1990-01-01',
      });
      const res = mockResponse();

      // Mock pour UserDatamapper.findByEmail et UserDatamapper.createUser
      UserDatamapper.findByEmail = jest.fn().mockResolvedValue(null);
      UserDatamapper.createUser = jest.fn().mockRejectedValue(new ApiError('Database error'));

      await UserController.createAccount(req, res, mockNext);

      expect(UserDatamapper.findByEmail).toHaveBeenCalledWith('newuser@example.com');
      expect(UserDatamapper.createUser).toHaveBeenCalledWith({
        firstname: 'John',
        lastname: 'Doe',
        email: 'newuser@example.com',
        password: 'password',
        city: 'New York',
        birth_date: '1990-01-01',
      });
      expect(mockNext).toHaveBeenCalledWith(expect(ApiError));
      expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Internal Server Error',
        statusCode: 500,
        errorCode: 'INTERNAL_SERVER_ERROR',
      }));
    });

    it('should handle incomplete input', async () => {
      const req = mockRequest({
        firstname: 'John',
        lastname: 'Doe',
        email: '',
        password: 'password',
        city: 'New York',
        birth_date: '1990-01-01',
      });
      const res = mockResponse();

      await UserController.createAccount(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(expect.any(new ApiError));
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ 
        message: 'All fields required',
        statusCode: 400, 
        errorCode: 'BAD_REQUEST', 
      }));
    });

    it('should handle existing email', async () => {
      const req = mockRequest({
        firstname: 'John',
        lastname: 'Doe',
        email: 'existing@example.com',
        password: 'password',
        city: 'New York',
        birth_date: '1990-01-01',
      });
      const res = mockResponse();

      // Mock pour UserDatamapper.findByEmail
      UserDatamapper.findByEmail = jest.fn().mockResolvedValue({});

      await UserController.createAccount(req, res, mockNext);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Email already exist', errorCode: 'BAD_REQUEST' });
    });

  });
});
