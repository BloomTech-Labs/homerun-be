// Grabbing all todos per household
// Accepts a variable for household id

// select todos.*  from households
// inner join households_todos on households.id = households_todos.households_id and households.id = 'a12345'
// inner join todos on households_todos.todos_id = todos.id

// Grabbing all todos per user
// Accepts a variable for user id



// Sort all todos per household by member
// ! Not quite working yet.


// select distinct on (todos_members.todos_id) todos.*, todos_members.members_id, todos_members.todos_id  from todos
// inner join todos_members on todos.household = 'a12345'
// inner join members on todos_members.members_id = members.id
// order by todos_members.todos_id asc