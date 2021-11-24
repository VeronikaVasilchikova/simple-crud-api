const Person = require('../models/personModel');
const { getPostData } = require('../utils.js');

const getPersons = async (req, res) => {
  try {
    const persons = await Person.findAll();
    res.writeHead(200, 'Content-Type', 'application/json');
    res.end(JSON.stringify(persons));
  }
  catch(error) {
    console.log(error);
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
      res.writeHead(404, 'Content-Type', 'application/json');
      res.end(JSON.stringify({message: 'Person not found'}));
    }
  }
  catch(error) {
    console.log(error);
  }
};

const createPerson = async (req, res) => {
  try {
    const body = await getPostData(req);
    const { name, age, hobbies } = JSON.parse(body);
    const person = {
      name,
      age,
      hobbies
    };
    const newPerson = await Person.create(person);
    res.writeHead(201, 'Content-Type', 'application/json');
    return res.end(JSON.stringify(newPerson));
  }
  catch(error) {
    console.log(error);
  }
};

const updatePerson = async (req, res, id) => {
  try {
    const person = await Person.findById(id);
    if (!person) {
      res.writeHead(404, 'Content-Type', 'application/json');
      res.end(JSON.stringify({message: 'Person not found'}));
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
    console.log(error);
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
      res.writeHead(404, 'Content-Type', 'application/json');
      res.end(JSON.stringify({message: 'Person not found'}));
    }
  }
  catch(error) {
    console.log(error);
  }
};

module.exports = {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  removePerson
}
