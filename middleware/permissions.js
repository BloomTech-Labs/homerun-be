const todosModel = require('../models/todos-model');

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

function canComplete(user, todo_id) {
  if (user.permission_level >= PERMISSIONS.ADMIN) {
    return Promise.resolve(true);
  }
  return todosModel.findMembersAssigned(todo_id).then((members) => {
    return members.find((mem) => mem.id === user.id);
  });
}

// same logic applies to deleting todos
function canEdit(user, todo_id) {
  if (user.permission_level >= PERMISSIONS.ADMIN) {
    return Promise.resolve(true);
  }
  return todosModel.findById(todo_id).then((todo) => {
    return todo.created_by === user.id;
  });
}

// same logic for unassigning
function canAssign(user, member_to_assign) {
  if (user.permission_level >= PERMISSIONS.ADMIN) {
    return Promise.resolve(true);
  }
  return (
    user.permission_level === PERMISSIONS.REGULAR &&
    user.id === member_to_assign.id
  );
}

function canChangePermission(user, member, permission_level) {
  // level 1 or 2 can't change another member's level
  // a level 3 or 4 can only change levels below them
  // to permission levels *still* below them
  return (
    user.permission_level >= PERMISSIONS.ADMIN &&
    member.permission_level < user.permission &&
    permission_level < user.permission_level
  );
}

// also can work for removing categories
function canCreateCategory(user) {
  return user.permission_level >= PERMISSIONS.ADMIN;
}

module.exports = {
  PERMISSIONS,
  canComplete,
  canEdit,
  canAssign,
  canChangePermission,
  canCreateCategory,
};
