# TidyHive backend

## Contributors

### Current

|                           [Adam Monast - TL](https://github.com/Adammonast)                           |                             [Batuhan Balta](https://github.com/baltabatuhan)                              |                             [Benjamin Hall](https://github.com/BenHall-7)                              |                             [Joshua Rieth](https://github.com/Bobj2018)                              |
| :---------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: |
| <img alt="Adam Monast" src="https://avatars2.githubusercontent.com/Adammonast" width=100 height=100/> | <img alt="Batuhan Balta" src="https://avatars2.githubusercontent.com/baltabatuhan" width=100 height=100/> | <img alt="Benjamin Hall" src="https://avatars2.githubusercontent.com/BenHall-7" width=100 height=100/> | <img alt="Joshua Rieth" src="https://avatars2.githubusercontent.com/Bobj2018" width=100 height=100/> |

|                             [Mike Padiernos](https://github.com/mikepadiernos)                              |                             [Nick Hansen](https://github.com/Hansen-Nick)                              |                             [Tauan Longaretti](https://github.com/tauanlongaretti)                              |
| :---------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
| <img alt="Mike Padiernos" src="https://avatars2.githubusercontent.com/mikepadiernos" width=100 height=100/> | <img alt="Nick Hansen" src="https://avatars2.githubusercontent.com/Hansen-Nick" width=100 height=100/> | <img alt="Tauan Longaretti" src="https://avatars2.githubusercontent.com/tauanlongaretti" width=100 height=100/> |

### Past

[Heather Ridgill](https://github.com/Heather-Ridgill), [Micah Jank](https://github.com/MicahJank), [Katrina Roaix](https://github.com/kroaix), [Yankho Trumble](https://github.com/Mayankho), [Zach Taylor](https://github.com/zbtaylor), [Vinni Hoke](https://github.com/vinnihoke), [Brandon Dresselle - TL](https://github.com/BDesselle)

## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm server** to start the local server
- **npm test** to start server using testing environment

## Setting up local environments

1. Postgres setup

   a) [Download an installer](https://www.postgresql.org/download/), and begin the installation process. The default username **postgres** will be shown to you. Change this if you'd like. Choose a password, and don't forget it.

   b) After installation, navigate to the folder where it installed and go to the "bin" subfolder. Copy the directory and add this to your computer's PATH environment variable. If this was done correctly you will be able to reference the executables within the folder from anywhere, you can test by trying `postgres --help` in any newly opened terminal, and you will see a list of options appear.

   c) Create two local databases, one for local development, and one for testing. You can do this with the `createdb` application in the terminal. If the username chosen was `postgres` when installing, then do `createdb -U postgres tidyhive`. You will be prompted for the password before execution. Do the same using `tidyhive-test` for the testing db.

   d) ALTERNATIVELY: you can set the PGUSER and PGPASSWORD environment variables to skip username and password prompting.

2. Setting up the .env file

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

## Documentation

### Backend deployed [here](https://dashboard.heroku.com/apps/stage-homerun-be)

### See [Frontend Documentation](https://github.com/Lambda-School-Labs/homerun-fe) for details on the frontend of our project

## Frameworks

- Express
- Node.JS
- Postgres

### Reasoning

- Flexibility
- Easy to use (speed, familiarity, etc)
- Great Ecosystems, libraries and modules
- Same language on frontend and backend
- Highly scalable and proven effective

## Endpoints

[Endpoints can be found here.](https://documenter.getpostman.com/view/9155829/SzKbMFcG?version=latest)

## HAVE FUN
