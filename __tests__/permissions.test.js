const permissions = require('../middleware/permissions');
const membersModel = require('../models/members-model');

let mom;
let dad;
let daughter;
let son;

beforeAll(async (done) => {
  mom = await membersModel.getById(1);
  dad = await membersModel.getById(2);
  daughter = await membersModel.getById(3);
  son = await membersModel.getById(4);
  done();
});

describe('Completing todos', () => {
  it('Is allowed on any todo, if the user is an admin', async () => {
    let can = await permissions.canComplete(dad, 1); // todo #1 is assigned to mom
    expect(can).toBeTruthy();
  });

  it('Is not allowed on lower-permission users unless assigned to them', async () => {
    let canDaughter = await permissions.canComplete(daughter, 3);
    let canSon = await permissions.canComplete(son, 4);
    expect(canDaughter).toBeTruthy();
    expect(canSon).toBeFalsy();
  });
});

describe('Editing todos', () => {
  it('Is allowed on any todo, if the user is an admin', async () => {
    let can = await permissions.canEdit(dad, 1);
    expect(can).toBeTruthy();
  });

  it('Is not allowed on lower permissions unless created by them', async () => {
    let canDaughter = await permissions.canEdit(daughter, 3);
    let canSon = await permissions.canEdit(son, 3);
    expect(canDaughter).toBeTruthy();
    expect(canSon).toBeFalsy();
  });
});

describe('Assigning members to todos', () => {
  it('Is allowed for any member, if the user assigning is an admin', async () => {
    let can = await permissions.canAssign(dad, 1);
    expect(can).toBeTruthy();
  });

  it('Is only allowed for a lv 2 member to assign themselves', async () => {
    let canDaughter1 = await permissions.canAssign(daughter, daughter.id);
    let canDaughter2 = await permissions.canAssign(daughter, son.id);
    let canSon = await permissions.canAssign(son, son.id);
    expect(canDaughter1).toBeTruthy();
    expect(canDaughter2).toBeFalsy();
    expect(canSon).toBeFalsy();
  });
});

describe('Can change permission of other users', () => {
  it('Is only allowed for admins', async () => {
    let canMom = await permissions.canChangePermission(mom, dad.id, 1);
    let canDaughter = await permissions.canChangePermission(daughter, son.id, 1);
    expect(canMom).toBeTruthy();
    expect(canDaughter).toBeFalsy();
  });

  it('Is not allowed for admins to change users equal or higher than them', async () => {
    let canMom = await permissions.canChangePermission(mom, dad.id, 4);
    let canDad = await permissions.canChangePermission(dad, mom.id, 1);
    expect(canMom).toBeFalsy();
    expect(canDad).toBeFalsy();
  })
});
