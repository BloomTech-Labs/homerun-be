exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("todos")
    .truncate()
    .then(() => {
      // Inserts seed entries
      return knex("todos").insert([
        {
          id: 1,
          household: "a12345",
          title: "This is the first todo.",
          desc:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sit sint illum voluptatibus voluptatum quia?",
          point_value: 20,
          due: 1318781876406,
          completed: false,
          completed_by: ""
        },
        {
          id: 2,
          household: "a12345",
          title: "This is the second todo.",
          desc:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sit sint illum voluptatibus voluptatum quia?",
          point_value: 125,
          due: 1318781876406,
          completed: false,
          completed_by: ""
        },
        {
          id: 3,
          household: "a12345",
          title: "This is the third todo.",
          desc:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sit sint illum voluptatibus voluptatum quia?",
          point_value: 40,
          due: 1318781876406,
          completed: true,
          completed_by: "Sample"
        },
        {
          id: 4,
          household: "a12345",
          title: "This is the fourth todo.",
          desc:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sit sint illum voluptatibus voluptatum quia?",
          point_value: 0,
          due: 1318781876406,
          completed: false,
          completed_by: ""
        },
        {
          id: 5,
          household: "a12345",
          title: "This is the fifth todo.",
          desc:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sit sint illum voluptatibus voluptatum quia?",
          point_value: 25,
          due: 1318781876406,
          completed: true,
          completed_by: "Test"
        }
      ]);
    });
};
