const Person = require('../models/personModel');
const { getPostData,
  handleServerError,
  handleClientError,
  checkRequiredProperties,
  checkPropertiesTypes } = require('../utils.js');

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

const getPerson = async (req, res, id) => {
  try {
    const person = await Person.findById(id);
    if (person) {
      res.writeHead(200, 'Content-Type', 'application/json');
      res.end(JSON.stringify(person));
    }
    else {
      handleClientError(res, id);
    }
  }
  catch(error) {
    handleServerError(res, error);
  }
};

const createPerson = async (req, res) => {
  try {
    const body = await getPostData(req);
    const parsedBody = JSON.parse(body);
    const { name, age, hobbies } = parsedBody;
    const checkRequiredProps = checkRequiredProperties(parsedBody);
    if (typeof checkRequiredProps === 'string') {
      res.writeHead(404, 'Content-Type', 'application/json');
      return res.end(JSON.stringify({
        message: `Sorry, you missed required properties: ${checkRequiredProps}`
      }));
    }
    if (checkRequiredProps) {
      const propertiesTypes = checkPropertiesTypes(parsedBody);
      if (typeof propertiesTypes === 'string') {
        res.writeHead(404, 'Content-Type', 'application/json');
        return res.end(JSON.stringify({
          message: `Sorry but ${propertiesTypes}`
        }));
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

const updatePerson = async (req, res, id) => {
  try {
    const person = await Person.findById(id);
    if (!person) {
      handleClientError(res, id);
    }
    else {
      const body = await getPostData(req);
      const { name, age, hobbies } = JSON.parse(body);
      const personDataToUpdate = {
        name: name || person.name,
        age: age || person.age,
        hobbies: hobbies || person.hobbies
      };
      const personToUpdate = await Person.update(personDataToUpdate, id);
      res.writeHead(201, 'Content-Type', 'application/json');
      return res.end(JSON.stringify(personToUpdate));
    }
  }
  catch(error) {
    handleServerError(res, error);
  }
};

const removePerson = async (req, res, id) => {
  try {
    const person = await Person.findById(id);
    if (person) {
      await Person.removeById(id);
      res.writeHead(200, 'Content-Type', 'application/json');
      res.end(JSON.stringify({message: `Person with id ${id} has been removed successfully!`}));
    }
    else {
      handleClientError(res, id);
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
