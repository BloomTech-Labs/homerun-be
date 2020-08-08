const db = require('../db/dbConfig.js');

// getAllCategories
const findCategories = () => {
  return db('category').select('*');
};

const addCategory = (category_name, household_id) => {
  return db('category')
    .insert({ category_name, household_id })
    .then(() => db('category').select('*'))
    .catch((err) => console.error(err));
};

const updateCategory = () => {};

const removeCategory = () => {};

module.exports = {
  findCategories,
  addCategory,
  updateCategory,
  removeCategory,
};
