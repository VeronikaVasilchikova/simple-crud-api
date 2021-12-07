## Hi! Welcome to my Simple CRUD API.

This is a part of the Node.js Course by RS School and here is [the task description](https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/simple-crud-api.md)

## Guide how to use Simple CRUD API

- you need to use [node](https://nodejs.org/en/) v16+

- clone source code from github to your local

- in your terminal navigate to the root directory

- in your terminal run `npm install`

- now you are ready to use Simple CRUD API

- to run Simple CRUD API in development mode you should run in your terminal `npm run start:dev`

- to run Simple CRUD API in development mode you should run in your terminal `npm run start:prod`

**To check work of Simple CRUD API:**

- recommend you to install [Postman](https://www.postman.com/)

- run in your terminal `npm run start:dev` or `npm run start:prod`

- open Postman and try make the following requests:

  * **GET** `http://localhost:3000/person` or `http://localhost:3000/person/{personId}` should return all persons or person with corresponding `personId`
    * `personId` should have the same structure as the following example `3b316079-cd3f-4b3c-821a-7f25bdf532c5`
  * **POST** `http://localhost:3000/person` is used to create record about new person and store it in database:
    * you should follow requirements to person's object:
      Persons are stored as `objects` that have following properties:
      * `id` — unique identifier (`string`, `uuid`) generated on server side
      * `name` — person's name (`string`, **required**)
      * `age` — person's age (`number`, **required**)
      * `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)
  * **PUT** `http://localhost:3000/person/{personId}` is used to update record about existing person
  * **DELETE** `http://localhost:3000/person/{personId}` is used to delete record about existing person from database

**Testing:**

- in your terminal navigate to the root directory

- to start testing you need run `npm test`
