[![Maintainability](https://api.codeclimate.com/v1/badges/a280d9a48c1e094a79cb/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/homerun-be/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/a280d9a48c1e094a79cb/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/homerun-be/test_coverage)

# API Documentation

#### 1️⃣ Backend deployed at TidyHive (https://dashboard.heroku.com/apps/stage-homerun-be) <br>

## 1️⃣ Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm server** to start the local server
- **npm test** to start server using testing environment

### Backend framework goes here

Express Node.JS

Reasoning:

- Flexibility
- Easy to use (speed, familiarity, etc)
- Great Ecosystems, libraries and modules
- Same language on frontend and backend

## 2️⃣ Endpoints

[Endpoints can be found here.](https://documenter.getpostman.com/view/9155829/SzKbMFcG?version=latest)

#### Organization Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/organizations/:orgId` | all users      | Returns the information for an organization. |
| PUT    | `/organizatoins/:orgId` | owners         | Modify an existing organization.             |
| DELETE | `/organizations/:orgId` | owners         | Delete an organization.                      |

#### User Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/users/current`        | all users           | Returns info for the logged in user.               |
| GET    | `/users/org/:userId`    | owners, supervisors | Returns all users for an organization.             |
| GET    | `/users/:userId`        | owners, supervisors | Returns info for a single user.                    |
| POST   | `/users/register/owner` | none                | Creates a new user as owner of a new organization. |
| PUT    | `/users/:userId`        | owners, supervisors |                                                    |
| DELETE | `/users/:userId`        | owners, supervisors |                                                    |

#### TODOs Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/todos/a12345`         | owners              | Returns info for all inputted todos in the system. |
| GET    | `/todos/a12345/:userId` | owners, supervisors | Returns all todos for a particular user.           |
| POST   | `/todos/add`            | user                | Creates a new todo                                 |
| PUT    | `/todos/:userId`        | user                | Returns: "title": "Updated todo title"             |
| DELETE | `/todos/:userId`        | owners, supervisors |                                                    |

# Data Model

🚫This is just an example. Replace this with your data model

#### 2️⃣ ORGANIZATIONS

---

```
{
  id: UUID
  name: STRING
  industry: STRING
  paid: BOOLEAN
  customer_id: STRING
  subscription_id: STRING
}
```

#### USERS

---

```
{
  id: UUID
  organization_id: UUID foreign key in ORGANIZATIONS table
  first_name: STRING
  last_name: STRING
  role: STRING [ 'owner', 'supervisor', 'employee' ]
  email: STRING
  phone: STRING
  cal_visit: BOOLEAN
  emp_visit: BOOLEAN
  emailpref: BOOLEAN
  phonepref: BOOLEAN
}
```

## 2️⃣ Actions

🚫 This is an example, replace this with the actions that pertain to your backend

`getOrgs()` -> Returns all organizations

`getOrg(orgId)` -> Returns a single organization by ID

`addOrg(org)` -> Returns the created org

`updateOrg(orgId)` -> Update an organization by ID

`deleteOrg(orgId)` -> Delete an organization by ID
<br>
<br>
<br>
`getUsers(orgId)` -> if no param all users

`getUser(userId)` -> Returns a single user by user ID

`addUser(user object)` --> Creates a new user and returns that user. Also creates 7 availabilities defaulted to hours of operation for their organization.

`updateUser(userId, changes object)` -> Updates a single user by ID.

`deleteUser(userId)` -> deletes everything dependent on the user

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

🚫 These are just examples, replace them with the specifics for your app

_ STAGING_DB - optional development db for using functionality not available in SQLite
_ NODE\*ENV - set to "development" until ready for "production"

- JWT*SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-_=+)') for i in range(50)])
  _ SENDGRID_API_KEY - this is generated in your Sendgrid account \* stripe_secret - this is generated in the Stripe dashboard

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.

### Sign Up

POST to `https://stage-homerun-be.herokuapp.com/auth/signup`

Takes an object including:

```javascript
{
    "username": "LambdaStudent247",
    "email": "homerun.labspt7@gmail.com",
    "password": "password",
    "confirm": "password",
}
```

Example Output:

````javascript
{
    "saved": {
        "id": 1,
        "username": "LambdaStudent247",
        "email": "homerun.labspt7@gmail.com",
        "password": "$2a$10$YWS/2323oqZKgkcmJ7AeWe2Q7W1tZYokZLCSIiuAv6BmqvldmXWl.",
        "confirm": "password",
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsInVzZXJuYW1lIjoiSGVhdGhlciIsInJvbGVzIjoidXNlciIsImlhdCI6MTU3ODcyMTM3MCwiZXhwIjoxNTc4ODA3NzcwfQ.S-d9Ze18GIFhGFvG5fljIhiVHSbXCWx2WvUZv5mq_7s"
}


### Login

POST to `https://bw-kids-fly.herokuapp.com/api/auth/login/user`

Takes an object including:
```javascript
{
   "username": "LambdaStudent247",
    "password": "password"
}
````

Example Output:

{
"message": "Welcome LambdaStudent247!",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsInVzZXJuYW1lIjoiTGFtYmRhU3R1ZGVudDI0NyIsInJvbGVzIjoidXNlciIsImlhdCI6MTU3ODcyNTk4MSwiZXhwIjoxNTc4ODEyMzgxfQ.GSpNXMkeXbkyS2S0nF_oifInr5KFgvLV_bNoEs195IY",
"userid": 1
}

### Register New Admin

POST to `https://bw-kids-fly.herokuapp.com/api/adminauth/register/admin`

Takes an object including:

```javascript
{
    "username": "LambdaStudent5000",
    "password": "password"

}
```

Example Output:

{
"id": 1,
"username": "LambdaStudent5000",
"password": "$2a$10\$X58bC9c2vZxnG6mgvf16uexgaaiyIDcyxRwLEw/34G54DF8r3mCaK"
}

### Login Existing Admin

POST to `https://bw-kids-fly.herokuapp.com/api/adminauth/login/admin`

Takes an object including:

```javascript
{
  "username": "LambdaStudent5000",
  "password": "password"
}
```

Example Output:

{
"message": "Welcome admin LambdaStudent5000!",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlkIjoxLCJ1c2VybmFtZSI6IkxhbWJkYVN0dWRlbnQ1MDAwIiwicm9sZXMiOiJhZG1pbiIsImlhdCI6MTU3ODM3MTQwMywiZXhwIjoxNTc4NDU3ODAzfQ.BLegBiUvih24THUB7LgzEFOnErW69vNXpfrMo9xfn50"
}

### Get all registered users

GET to `https://bw-kids-fly.herokuapp.com/api/user/`

Takes an object including:

```javascript
[
  {
    id: 1,
    username: "LambdaStudent247",
    password: "$2a$10$6NrOGH/43.iC.t8gndaGV.N3ZNRnaaoln44K.urxOCsgmdwp67EeK"
  },
  {
    id: 2,
    username: "LambdaStudent247",
    password: "$2a$10$65ZgEq5rUvjcw4WDfZsei.OysphHJWS/0VpSCvbgey5MI8qCyWWce"
  }
];
```

### Post a new trip

POST to `https://bw-kids-fly.herokuapp.com/api/trips/trip`

Takes a JWT and an object including:

```javascript
{
"airport_name": "SFO",
"airline": "1255",
"flight_number": "25",
"departure_time": "12PM",
"carryon_items": "3",
"checked_items": "1",
"children": "10",
"special_needs": "We have a stroller",
}
```

Example Output:

{
"message": "Congratulations, you successfully created a new trip!",
"accountID": [
1
]
}

### Update trip

PUT to `https://bw-kids-fly.herokuapp.com/api/trip/:id` //where id is trip's ID

Takes a JWT and an object containing any of the existing trip properties that are to be updated.

### Delete a trip

DELETE to `https://bw-kids-fly.herokuapp.com/api/trip/:id` //where id is trip's ID

Takes a JWT

### Get all trips items in database

GET to `https://bw-kids-fly.herokuapp.com/api/trips`

Will be returned an array with trip objects.

Example Output:

```javascript
([
    {"airport name": 'LAX', airline: 'Southwest',"flight_number": '1544', "departure_time": '2:30PM',"carryon_items": '5', children: '3', "special_needs": 'We have a stroller'},

    {"airport name": 'SFO', airline: 'American Airlines',"flight_number": '300', "departure_time": '5PM',"carryon_items": '4', children: '5', "special_needs": 'NA'},

    {"airport name": 'MEX', airline: 'International',"flight_number": '2463', "departure_time": '8AM',"carryon_items": '2', children: '1', "special_needs": ''},


  ]);


};
```

### Submitting an application

POST to `https://bw-kids-fly.herokuapp.com/api/apps`

```javascript
{
	"email": "LambdaStudent365@Lambda.edu",
    "password": "password",
    "confirm": "password",
    "first_name": "Heather",
    "last_name": "Ridgill"

}
```

Example Output:
{
"message": "You have now applied to be a KidsFlyConnection Staff Member!"
}
