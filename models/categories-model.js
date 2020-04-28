const db = require('../db/dbConfig.js');

// getAllCategories
const findCategories = () => {
    return db('category')
            .select('*');
}

// getCategoryByName
// const findCategoryByName = category_name => {
//     return db('category')
//             .where({ category_name })
//             .first();
// }

const findTodoCategories = todoId => {
   return db('todo_categories')
        .join('category', 'todo_categories.category_name', 'category.category_name')
        .select('category.category_name')
        .where({ todo_id: todoId })
        .then(res => {
            // since the res is an array of objects and what we need
            // the todo category structure to be is an array of strings
            // i will have to map over the res and return just
            // the category name
            const categories = res.map(category => {
                return category.category_name;
            })
            return categories;
        })
}

// add new todo_categories by todo id and category id
const addTodoCategories = (todo_id, category_name) => {
    return db('todo_categories')
             .insert({ todo_id, category_name })
             .then(() => {
                 return findTodoCategories(todo_id); 
             })          
}

// remove existing todo_categories by todo id and category id
const removeTodoCategories = (todo_id, category_name) => {
    return db('todo_categories')
             .where({ todo_id, category_name })
             .del()
             .then(() => { 
                 return findTodoCategories(todo_id)
             })
}

module.exports = {
    findCategories,
    findTodoCategories,
    addTodoCategories,
    removeTodoCategories
}