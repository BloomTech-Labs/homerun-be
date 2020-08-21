const todosModel = require('../models/todos-model');
const membersModel = require('../models/members-model');

const PERMISSIONS = {
  // read todos, complete todos assigned to them
  LOW: 1,
  // create todos, and assign themselves to todos
  REGULAR: 2,
  // (un)assign anyone with lower level to todos, edit any todos
  ADMIN: 3,
  // can do anything. Only 1 user should have this permission at a time
  OWNER: 4,
};

async function canComplete(user, todo_id) {
  if (user.permission_level >= PERMISSIONS.ADMIN) {
    return true;
  }
  let members = await todosModel.findMembersAssigned(todo_id);
  return members.find((mem) => mem.id === user.id);
}

// same logic applies to deleting todos
async function canEdit(user, todo_id) {
  let todo = await todosModel.findById(todo_id);
  if (todo && todo.household === user.current_household) {
    if (user.permission_level >= PERMISSIONS.ADMIN) {
      return true;
    }
    return (
      user.permission_level === PERMISSIONS.REGULAR &&
      todo.created_by === user.id
    );
  }
  return false;
}

// same logic for unassigning
async function canAssign(user, member_id) {
  let member = await membersModel.getById(member_id);
  if (member && member.current_household === user.current_household) {
    return (
      user.permission_level >= PERMISSIONS.ADMIN ||
      (user.permission_level === PERMISSIONS.REGULAR && user.id === member_id)
    );
  }
  return false;
}

async function canChangePermission(user, member_id, permission_level) {
  // level 1 or 2 can't change another member's level
  // a level 3 or 4 can only change levels below them
  // to permission levels *still* below them
  let member = await membersModel.getById(member_id);
  if (member && member.current_household === user.current_household) {
    return (
      user.permission_level >= PERMISSIONS.ADMIN &&
      user.permission_level > member.permission_level &&
      user.permission_level > permission_level
    );
  }
  return false;
}

// The following don't have to be async because
// the parameters that users can enter are restrictive enough to not need checking
// i.e. the household ID is determined by the tokens

function canInvite(user, permission_level) {
  return (
    user.permission_level >= PERMISSIONS.ADMIN &&
    user.permission_level > permission_level
  );
}

function canCreateTodo(user) {
  return user.permission_level >= PERMISSIONS.REGULAR;
}

// also can work for removing categories
function canCreateCategory(user) {
  return user.permission_level >= PERMISSIONS.ADMIN;
}

function canEditHousehold(user) {
  return user.permission_level === PERMISSIONS.OWNER;
}

module.exports = {
  PERMISSIONS,
  canComplete,
  canEdit,
  canAssign,
  canChangePermission,
  canCreateCategory,
  canEditHousehold,
  canInvite,
  canCreateTodo,
};
