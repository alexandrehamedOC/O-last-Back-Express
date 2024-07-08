import { jest } from '@jest/globals';
import UserController from '../../controllers/user.controller.js';

const mockReq = () => {
  const req = {};
  req.body = jest.fn().mockReturnValue(req);
  req.params = jest.fn().mockReturnValue(req);
  return req;
};
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();

//test
describe('UserController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('createAccount', () => {
  it('should return 201 status code', async () => {
    const req = mockReq();
    mockRes();
    req.body = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123.',
      discord_username: 'johndoe#1234',
      city: 'Paris',
      birth_date: '1990-01-01',
    };
    const res = mockRes();
    await UserController.createAccount(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      discordUsername: 'JohnDoe#1234',
      city: 'New York',
    }));

  });
});
