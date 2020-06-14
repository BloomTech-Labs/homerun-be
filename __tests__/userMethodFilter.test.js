const typeCheck = require('../middleware/userMethodFilter.js');

const mockRequest = (path, body, id) => {
  return {
    path: path || '',
    body: body,
    params: { id },
  };
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Unassign Users', () => {
  const user = {
    id: 1,
    username: 'john',
    email: 'test@gmail.com',
    password: 'aslasdf123456asdf321a6s5df46',
  };

  test('User check is passing when not child', async () => {
    const req = mockRequest(`unassign/${user.id}`, user, user.id);
    const res = mockResponse();
    await typeCheck(req, res, () => {});
    expect(req.body.child).toBeUndefined();
  });
});

describe('Unassign Child', () => {
  const child = {
    id: 1,
    household_id: 'a12345',
    username: 'Bobby',
    child: true,
    points: 60,
  };

  test('User check is passing when not child', async () => {
    const req = mockRequest(`unassign/${child.id}`, child, child.id);
    const res = mockResponse();
    await typeCheck(req, res, () => {});
    expect(req.body.child).toBe(true);
  });
});
