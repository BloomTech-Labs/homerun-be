// Grabbing all todos per household
// Accepts a variable for household id

// select todos.*  from households
// inner join households_todos on households.id = households_todos.households_id and households.id = 'a12345'
// inner join todos on households_todos.todos_id = todos.id

// Grabbing all todos per user
// Accepts a variable for user id

// select todos.*  from members
// inner join todos_members on members.id = todos_members.members_id and members.id = '2'
// inner join todos on todos_members.todos_id = todos.id
// GROUP BY todos.id
// ORDER BY todos.id