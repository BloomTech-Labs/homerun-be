# Contributors

|    [Heather Ridgill ](https://github.com/Heather-Ridgill)      |     [Micah Jank](https://github.com/MicahJank)       |     [Katrina Roaix](https://github.com/kroaix)     |     [Yankho Trumble](https://github.com/Mayankho)     | | [Zach Taylor ](https://github.com/zbtaylor) | [Vinni Hoke](https://github.com/vinnihoke) | [Brandon Dresselle - TL](https://github.com/BDesselle) |

[![Maintainability](https://api.codeclimate.com/v1/badges/a280d9a48c1e094a79cb/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/homerun-be/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/a280d9a48c1e094a79cb/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/homerun-be/test_coverage)

# Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm server** to start the local server
- **npm test** to start server using testing environment

## Setting up local environments

1) Postgres setup

    a) [Download an installer](https://www.postgresql.org/download/), and begin the installation process. The default username **postgres** will be shown to you. Change this if you'd like. Choose a password, and don't forget it.

    b) After installation, navigate to the folder where it installed and go to the "bin" subfolder. Copy the directory and add this to your computer's PATH environment variable. If this was done correctly you will be able to reference the executables within the folder from anywhere, you can test by trying `postgres --help` in any newly opened terminal, and you will see a list of options appear.

    c) Create two local databases, one for local development, and one for testing. You can do this with the `createdb` application in the terminal. If the username chosen was `postgres` when installing, then do `createdb -U postgres tidyhive`. You will be prompted for the password before execution. Do the same using `tidyhive-test` for the testing db.
    d) ALTERNATIVELY: you can set the PGUSER and PGPASSWORD environment variables to skip username and password prompting.
2) Setting up the .env file

    a) In order to use purecrypt, two env variables are required. If you don't have PGUSER or PGPASSWORD env variables globally set, then you will need to include them here to access the databases. Other env variables needed are included. For ALGO, see the purecrypt documentation for available options:
    
    ```text
    // If you chose other db names, adjust as necessary
    DB_DEV_URL=postgres://localhost/tidyhive
    DB_TEST_URL=postgres://localhost/tidyhive-test
    JWT_SECRET=<MY JWT SECRET>
    SESSION_KEY=<MY SESSION KEY>

    // Postgres stuff
    PGUSER=<MY POSTGRES USERNAME>
    PGPASSWORD=<MY POSTGRES PASSWORD>

    // Purecrypt stuff:
    CRYPTO_KEY=<PURECRYPT KEY>
    ALGO=<PURECRYPT ALGORITHM>
    ```

    b) Now you will need to migrate both databases. To do so run `knex migrate:latest` and `knex migrate:latest --env=test`. Finally check to see they behave correctly by running `yarn test`.

# Documentation

#### Backend deployed at TidyHive (https://dashboard.heroku.com/apps/stage-homerun-be)

#### See [Frontend Documentation](https://github.com/Lambda-School-Labs/homerun-fe) for details on the fronend of our project.


# Backend framework goes here

- Express 
- Node.JS

## Reasoning:

- Flexibility
- Easy to use (speed, familiarity, etc)
- Great Ecosystems, libraries and modules
- Same language on frontend and backend

## Endpoints

[Endpoints can be found here.](https://documenter.getpostman.com/view/9155829/SzKbMFcG?version=latest)

# Auth Routes

## *Signup*

| Method | Endpoint                | Access Control |                                 
| ------ | ----------------------- | -------------- | 
| POST    | `/auth/signup`        | all users      | 


Takes an object including:
```javascript 
Body Raw

{
  "username": "some_user_name",
  "email": "test@test.com",
  "password": "password"
}
```
### Returned Example

{
  "message": "A confirmation email has been sent to test@test.com"
}



## *Confirm Email*

| Method | Endpoint                | Access Control |                                 
| ------ | ----------------------- | -------------- | 
| POST    | `/auth/confirm`        | all users      | 


Takes an object including:
```javascript 
Body Raw

  {
	"hash": "a1di21o1n2908q2398h"
}

```
### Returned Example

{
  "message": "User confirmed successfully."
}


## *Log in

| Method | Endpoint                | Access Control |                                 
| ------ | ----------------------- | -------------- | 
| POST    | `/auth/login`        | all users      | 


Takes an object including:
```javascript 
Body Raw

{
	"email": "mom@test.com",
	"password": "password"
}

```
### Returned Example

{ <br>
  "message": "Welcome, mom@test.com", <br>
  "token": "" <br>
}

## *Forgot Password*

| Method | Endpoint                | Access Control |                                 
| ------ | ----------------------- | -------------- | 
| POST    | `/auth/forgot`        | all users      | 


Takes an object including:
```javascript 
Body Raw

{
	"email": "mom@test.com"
}

```
### Returned Example

{
  "message": "A password reset link has been sent to zbtaylor1@gmail.com"
}


## *Password Reset*

| Method | Endpoint                | Access Control |                                 
| ------ | ----------------------- | -------------- | 
| POST    | `/auth/reset`        | all users      | 


Takes an object including:
```javascript 
Body Raw

{
	"hash": "e7e14facb3b2138f3b24eab6ba162ee89e0ac339",
	"password": "new_password"
}

```
### Returned Example

{
  "message": "Your password has been reset."
}

# OAuth Google

## *Confirm Email*

| Method | Endpoint                | Access Control |                                 
| ------ | ----------------------- | -------------- | 
| GET    | `/connect/google`        | all users      | 


<br>

# TODO Endpoints

## *Add a todo*

| Method | Endpoint                | Access Control |                                 
| ------ | ----------------------- | -------------- | 
| POST    | `/todos/add`        | logged in users     | 


Takes an object including:
```javascript 
Body Raw

 {
	"title": "New Todo",
	"household": "a12345"
}
```
### Returned Example
```javascript 
{
  "id": 6,
  "household": "a12345",
  "title": "New Todo",
  "desc": null,
  "point_value": null,
  "created_at": null,
  "due": null,
  "completed": null,
  "completed_by": null,
}
```

## *Update a todo*

| Method | Endpoint                | Access Control |                                 
| ------ | ----------------------- | -------------- | 
| PUT    | `/todos/1`        | Only logged in users account     | 


Takes an object including:
```javascript 

Body Raw
{
	"title": "Updated Todo Title"
}

```
### Returned Example
```javascript 
{
  "id": 1,
  "household": "a12345",
  "title": "Updated Todo Title",
  "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sit sint illum voluptatibus voluptatum quia?",
  "point_value": 20,
  "created_at": null,
  "due": "1318781876406",
  "completed": false,
  "completed_by": ""
}
```
## *Assign a todo*

| Method | Endpoint                | Access Control |                                 
| ------ | ----------------------- | -------------- | 
| POST    | `/todos/assign/5`        | Only logged in users account     | 


Takes an object including:
```javascript 

Body Raw
{
    "assignees": [
        {
            "type": "member",
            "id": 1
        },
        {
            "type": "member",
            "id": 2
        },
        {
            "type": "child",
            "id": 1
        }
    ]
}

```
### Returned Example
```javascript 
[
  {
    "username": "mom",
    "child": false,
    "points": 25
  },
  {
    "username": "dad",
    "child": false,
    "points": 40
  },
  {
    "username": "Lil Suzie",
    "child": true,
    "points": 25
  }
]
```

## *Unassign a todo*

| Method | Endpoint                | Access Control |                                 
| ------ | ----------------------- | -------------- | 
| POST    | `/unassign/5`        | Only logged in users account     | 


Takes an object including:
```javascript 

Body Raw
{
    "assignees": [
        {
            "type": "member",
            "id": 1
        },
        {
            "type": "child",
            "id": 1
        }
    ]
}

```
### Returned Example
```javascript 
[
  {
    "username": "mom",
    "child": false,
    "points": 25
  },
  {
    "username": "dad",
    "child": false,
    "points": 40
  }
]
```

## *Delete a todo*

| Method | Endpoint                | Access Control |                                 
| ------ | ----------------------- | -------------- | 
| DEL    | `/todos/5`        | Only logged in users account     | 


Takes an object including:
Authorization: Token


### Returned Example
```javascript 
{
	message: "$1 todo(s) removed"
}
```
## *Todo by household*

| Method | Endpoint                | Access Control |                                 
| ------ | ----------------------- | -------------- | 
| GET    | `/todos/household`        | Only logged in users account     | 


Takes an object including:
Authorization: Token


### Returned Example
```javascript 
{
    "id": 2,
    "household": "a12345",
    "title": "This is the second todo.",
    "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sit sint illum voluptatibus voluptatum quia?",
    "point_value": 125,
    "created_at": null,
    "due": "1318781876406",
    "completed": false,
    "completed_by": "",
    "assigned": [
      {
        "username": "mom",
        "child": false,
        "points": 25
      },
      {
        "username": "dad",
        "child": false,
        "points": 40
      },
      {
        "username": "Lil Suzie",
        "child": true,
        "points": 25
      }
    ]
  },
  {
    "id": 3,
    "household": "a12345",
    "title": "This is the third todo.",
    "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sit sint illum voluptatibus voluptatum quia?",
    "point_value": 40,
    "created_at": null,
    "due": "1318781876406",
    "completed": true,
    "completed_by": "Sample",
    "assigned": []
  },
```
## *All Users Assigned to Todo*

| Method | Endpoint                | Access Control |                                 
| ------ | ----------------------- | -------------- | 
| GET    | `/todos/assigned/5`        | Only logged in users account     | 


Takes an object including:
```javascript 

Body Raw
{
    "assignees": [
        {
            "type": "member",
            "id": 1
        },
        {
            "type": "member",
            "id": 2
        },
        {
            "type": "child",
            "id": 1
        }
    ]
}

```

### Returned Example
```javascript 
{
    "assignees": [
        {
            "type": "member",
            "id": 1
        },
        {
            "type": "member",
            "id": 2
        },
        {
            "type": "child",
            "id": 1
        }
    ]
}
```

# Members & Children Endpoints

## *Add Child*

| Method | Endpoint                | Access Control |                                 
| ------ | ----------------------- | -------------- | 
| POST    | `/household/children`        | Only logged in users account     | 


Takes an object including:
```javascript 

Body Raw
{
	"username": "Child Name"
}

```

### Returned Example
```javascript 
[
  {
    "id": 5,
    "username": "Child Name",
    "points": null,
    "child": true,
    "household_id": "a12345"
  }
]
```

## *Update Child

| Method | Endpoint                | Access Control |                                 
| ------ | ----------------------- | -------------- | 
| PUT    | `/household/children/1`        | Only logged in users account     | 


Takes an object including:
```javascript 

Body Raw
{
	"username": "Changed Child Name",
	"points": 10
}

```

### Returned Example
```javascript 
[
  {
    1
  }
]
```

## *Delete Child*

| Method | Endpoint                | Access Control |                                 
| ------ | ----------------------- | -------------- | 
| DEL    | `/household/children/5`        | Only logged in users account     | 


Takes an object including:
Authorization: Token


### Returned Example
```javascript 
{
	1
}
```

## *Update Member / Accept Household Invite*

| Method | Endpoint                | Access Control |                                 
| ------ | ----------------------- | -------------- | 
| PUT    | `/household/children`        | Only logged in users account     | 


Takes an object including:
```javascript 

Body Raw
{
	"username": "Changed Member Name"
}

```

### Returned Example
```javascript 
{
	"username": "Changed Member Name"
}
```

## *All Members in Household*

| Method | Endpoint                | Access Control |                                 
| ------ | ----------------------- | -------------- | 
| GET    | `/household/assignable`        | Only logged in users account     | 


Takes an object including:
Authorization: Token

### Returned Example
```javascript 
  {
    "id": 1,
    "username": "mom",
    "email": "mom@test.com",
    "password": "$2a$14$VfyTw42uvMPAGGWlHPOXSe9yphUBAyp0XYpKk0txhgYTsSmD0UFni",
    "provider": "email",
    "access_token": "",
    "refresh_token": "",
    "points": 25,
    "child": false,
    "active": true,
    "current_household": "a12345"
  },
  {
    "id": 1,
    "username": "Lil Suzie",
    "points": 25,
    "child": true,
    "household_id": "a12345"
  },
```
<!-- PRIVATE -->

<!-- # Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

- DEV_LOCAL=postgresql://postgres:Test1234@localhost/postgres (Download postgres and add url with your password here)
- JWT_SECRET=thisissupercereal
- SG_USER=apikey
- SG_PASS=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
- BASE_URL=http://localhost:3000
- FE_URL=http://localhost:3001
- OAUTH_URL=localhost:3000
- OAUTH_PROTOCOL=http
- ALGO=aes-256-cbc
- CRYPTO_KEY=True nobility is being superior to your former self.
- SESSION_KEY=this is a session key
- G_CLIENT_ID=1050964061778-o501f0usfcgqtapvsmhvs89eebtndv9m.apps.googleusercontent.com
- G_CLIENT_SECRET=G1tKjOJDY5srwnyMPf8bJbvk
- F_CLIENT_ID=200338417844322
- F_CLIENT_SECRET=7a99ae1f44e01f370261b55b9e37d45f -->


# HAVE FUN! 

<!-- 
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

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426). -->



