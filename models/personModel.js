const { v4: uuidv4 } = require('uuid');
const PERSONS = require('../data/index.json');
const { writeDataToFile } = require('../utils.js');

const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(PERSONS);
  })
};

const findById = (id) => {
  return new Promise((resolve, reject) => {
    const person = PERSONS
      .find(item => item.id.toString() === id.toString());
    resolve(person);
  })
};

const create = (person) => {
  return new Promise((resolve, reject) => {
    const newPerson = {id: uuidv4(), ...person};
    PERSONS.push(newPerson);
    writeDataToFile('./data/index.json', PERSONS);
    resolve(newPerson);
  })
};

const update = (data, id) => {
  return new Promise((resolve, reject) => {
    const index = PERSONS
      .findIndex(item => item.id.toString() === id.toString());
    PERSONS[index] = {id, ...data};
    writeDataToFile('./data/index.json', PERSONS);
    resolve(PERSONS[index]);
  })
};

const removeById = (id) => {
  return new Promise((resolve, reject) => {
    const updatedPersonsData = PERSONS
      .filter(item => item.id.toString() !== id.toString());
    writeDataToFile('./data/index.json', updatedPersonsData);
    resolve();
  })
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  removeById
};
