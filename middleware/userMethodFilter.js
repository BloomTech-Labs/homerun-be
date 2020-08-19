const TodosMembers = require('../models/todos-members-model.js');

const insert = async (user, id) => {
  await TodosMembers.insert({ member_id: user.id, todo_id: id });
};

const remove = async (user, id) => {
  await TodosMembers.remove({ member_id: user.id, todo_id: id });
};

const paramCheck = (req) => {
  if (!req.body || !req.params.id) throw new Error('Missing body or todo id');
};

module.exports = async (req, res, next) => {
  paramCheck(req);
  const user = req.body;
  const id = req.params.id;
  switch (req.path) {
    case `/assign/${id}`:
      insert(user, id)
        .then(() => next())
        .catch((err) => console.log(err.message));
      break;
    case `/unassign/${id}`:
      remove(user, id)
        .then(() => next())
        .catch((err) => console.log(err.message));
      break;
    default:
      return next('Invalid request');
  }
};
