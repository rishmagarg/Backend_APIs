let { app } = require('../index.js');
let { getEmployeeById, getEmployees } = require('../controllers');
let http = require('http');
const request = require('supertest');
const { beforeEach, describe } = require('node:test');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getEmployees: jest.fn(),
}));
let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3008, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Controller Function Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all employees', () => {
    let mockedEmployees = [
      {
        employeeId: 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: 'Priya Singh',
        email: 'priya.singh@example.com',
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: 'Ankit Verma',
        email: 'ankit.verma@example.com',
        departmentId: 1,
        roleId: 3,
      },
    ];

    getEmployees.mockReturnValue(mockedEmployees);
    let result = getEmployees();
    expect(result).toEqual(mockedEmployees);
    expect(result.length).toBe(3);
  });
});

describe('API Endpoints Tests', () => {
  it('GET /employees should get all employees', async () => {
    const response = await request(server).get('/employees');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      employees: [
        {
          employeeId: 1,
          name: 'Rahul Sharma',
          email: 'rahul.sharma@example.com',
          departmentId: 1,
          roleId: 1,
        },
        {
          employeeId: 2,
          name: 'Priya Singh',
          email: 'priya.singh@example.com',
          departmentId: 2,
          roleId: 2,
        },
        {
          employeeId: 3,
          name: 'Ankit Verma',
          email: 'ankit.verma@example.com',
          departmentId: 1,
          roleId: 3,
        },
      ],
    });
    expect(response.body.employees.length).toBe(3);
  });

  it('GET /employees/details/:id should get the employee by id', async () => {
    const res = await request(server).get('/employees/details/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      employee: {
        employeeId: 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        departmentId: 1,
        roleId: 1,
      },
    });
  });
});
