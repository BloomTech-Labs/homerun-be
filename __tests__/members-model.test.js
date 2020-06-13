const db = require('../db/dbConfig.js');
const Members = require('../models/members-model.js');

describe('Testing Members Model', () => {
  beforeEach(() => {
    return db.raw('TRUNCATE members, members RESTART IDENTITY CASCADE');
  });

  describe('Adding members to household', () => {
    test('Add two members', async () => {
      let members;
      members = await db('members');
      expect(members).toHaveLength(0);

      await Members.insert({
        current_household: 'a12345',
        username: 'test1',
        email: 'test1@test.com',
        password: 'test1234',
        provider: 'email',
        access_token: '',
        refresh_token: '',
        points: 25,
        active: true,
        child: false,
      });
      await Members.insert({
        current_household: 'a12345',
        username: 'test2',
        email: 'test2@test.com',
        password: 'test1234',
        provider: 'email',
        access_token: '',
        refresh_token: '',
        points: 45,
        active: true,
        child: false,
      });
      members = await db('members');
      expect(members).toHaveLength(2);
    });
  });
  describe('Removing members from a household', () => {
    test('Add two users then remove one member', async () => {
      let members;
      members = await db('members');
      expect(members).toHaveLength(0);

      await Members.insert({
        current_household: 'a12345',
        username: 'test1',
        email: 'test1@test.com',
        password: 'test1234',
        provider: 'email',
        access_token: '',
        refresh_token: '',
        points: 25,
        active: true,
        child: false,
      });
      await Members.insert({
        current_household: 'a12345',
        username: 'test2',
        email: 'test2@test.com',
        password: 'test1234',
        provider: 'email',
        access_token: '',
        refresh_token: '',
        points: 45,
        active: true,
        child: false,
      });
      await Members.remove(2);
      members = await db('members');
      expect(members).toHaveLength(1);
    });
  });
  describe('Finding members by email', () => {
    test('Add two members and find one by email', async () => {
      let members;
      members = await db('members');
      expect(members).toHaveLength(0);

      await Members.insert({
        current_household: 'a12345',
        username: 'test1',
        email: 'test1@test.com',
        password: 'test1234',
        provider: 'email',
        access_token: '',
        refresh_token: '',
        points: 25,
        active: true,
        child: false,
      });
      await Members.insert({
        current_household: 'a12345',
        username: 'test2',
        email: 'test2@test.com',
        password: 'test1234',
        provider: 'email',
        access_token: '',
        refresh_token: '',
        points: 45,
        active: true,
        child: false,
      });
      const member = await Members.getByEmail('test2@test.com');
      expect(member.username).toMatch('test2');
    });
  });
  describe('Updating members, find by id', () => {
    test('Add two members and update one, and get by id', async () => {
      let members;
      members = await db('members');
      expect(members).toHaveLength(0);

      await Members.insert({
        current_household: 'a12345',
        username: 'test1',
        email: 'test1@test.com',
        password: 'test1234',
        provider: 'email',
        access_token: '',
        refresh_token: '',
        points: 25,
        active: true,
        child: false,
      });
      await Members.insert({
        current_household: 'a12345',
        username: 'test2',
        email: 'test2@test.com',
        password: 'test1234',
        provider: 'email',
        access_token: '',
        refresh_token: '',
        points: 45,
        active: true,
        child: false,
      });

      let update = {
        current_household: 'a12345',
        username: 'test2',
        email: 'testingtesting@test.com',
        password: 'test1234',
        provider: 'email',
        access_token: '',
        refresh_token: '',
        points: 45,
        active: true,
        child: false,
      };
      const request = await Members.update(2, update);
      const member = await Members.getById(2);
      expect(member.email).toMatch('testingtesting@test.com');
    });
  });
});
