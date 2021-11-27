const Person = require('../models/personModel');
const { getPostData,
  handleServerError,
  handleClientError,
  filterNecessaryProperties,
  checkRequiredProperties,
  checkPropertiesTypes } = require('../utils');

/**
 * Get list of exisiting persons
 * @param {any} req
 * @param {any} res
 * @returns {void}
 */
const getPersons = async (req, res) => {
  try {
    const persons = await Person.findAll();
    res.writeHead(200, 'Content-Type', 'application/json');
    res.end(JSON.stringify(persons));
  }
  catch(error) {
    handleServerError(res, error);
  }
};

/**
 * Get info about an exisiting person by id
 * @param {any} req
 * @param {any} res
 * @param {string | number} id
 * @returns {void}
 */
const getPerson = async (req, res, id) => {
  try {
    const person = await Person.findById(id);
    if (person) {
      res.writeHead(200, 'Content-Type', 'application/json');
      res.end(JSON.stringify(person));
    }
    else {
      const errorMessage = `Sorry, person with id=${id} not found`;
      handleClientError(404, res, errorMessage);
    }
  }
  catch(error) {
    handleServerError(res, error);
  }
};

/**
 * Create a new person
 * @param {any} req
 * @param {any} res
 * @returns {void}
 */
const createPerson = async (req, res) => {
  try {
    const body = await getPostData(req);
    const parsedBody = JSON.parse(body);
    const { name, age, hobbies } = parsedBody;
    const filteredBody = filterNecessaryProperties(parsedBody);
    const checkRequiredProps = checkRequiredProperties(filteredBody);
    if (typeof checkRequiredProps === 'string') {
      const errorMessage = `Sorry, you missed required properties: ${checkRequiredProps}`;
      handleClientError(400, res, errorMessage);
    }
    else if (typeof checkRequiredProps === 'boolean' && checkRequiredProps) {
      const propertiesTypes = checkPropertiesTypes(filteredBody);
      if (typeof propertiesTypes === 'string') {
        handleClientError(400, res, `Sorry but ${propertiesTypes}`);
      }
      else {
        const person = {
          name,
          age,
          hobbies
        };
        const newPerson = await Person.create(person);
        res.writeHead(201, 'Content-Type', 'application/json');
        return res.end(JSON.stringify(newPerson));
      }
    }
  }
  catch(error) {
    handleServerError(res, error);
  }
};

/**
 * Update an exisiting person by id
 * @param {any} req
 * @param {any} res
 * @param {string | number} id
 * @returns {void}
 */
const updatePerson = async (req, res, id) => {
  try {
    const person = await Person.findById(id);
    if (!person) {
      const errorMessage = `Sorry, person with id=${id} not found`;
      handleClientError(404, res, errorMessage);
    }
    else {
      const body = await getPostData(req);
      const parsedBody = JSON.parse(body);
      const filteredBody = filterNecessaryProperties(parsedBody);
      const propertiesTypes = checkPropertiesTypes(filteredBody);
      if (typeof propertiesTypes === 'string') {
        const errorMessage = `Sorry but ${propertiesTypes}`;
        handleClientError(400, res, errorMessage);
      }
      else {
        const { name, age, hobbies } = filteredBody;
        const personDataToUpdate = {
          name: name || person.name,
          age: age || person.age,
          hobbies: hobbies || person.hobbies
        };
        const personToUpdate = await Person.update(personDataToUpdate, id);
        res.writeHead(200, 'Content-Type', 'application/json');
        return res.end(JSON.stringify(personToUpdate));
      }
    }
  }
  catch(error) {
    handleServerError(res, error);
  }
};

/**
 * Remove an exisiting person by id
 * @param {any} req
 * @param {any} res
 * @param {string | number} id
 * @returns {void}
 */
const removePerson = async (req, res, id) => {
  try {
    const person = await Person.findById(id);
    if (person) {
      await Person.removeById(id);
      res.writeHead(204, 'Content-Type', 'application/json');
      res.end();
    }
    else {
      const errorMessage = `Sorry, person with id=${id} not found`;
      handleClientError(404, res, errorMessage);
    }
  }
  catch(error) {
    handleServerError(res, error);
  }
};

module.exports = {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  removePerson
};
