const { v4: uuidv4 } = require('uuid');
const PERSONS = require('../data/index.json');
const { writeDataToFile } = require('../utils');

/**
 * Find all items
 * @returns {Promise}
 */
const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(PERSONS);
  })
};

/**
 * Find item by id
 * @param {string | number}
 * @returns {Promise}
 */
const findById = (id) => {
  return new Promise((resolve, reject) => {
    const person = PERSONS
      .find(item => item.id.toString() === id.toString());
    resolve(person);
  })
};

/**
 * Create a new item
 * @param {any} person
 * @returns {Promise}
 */
const create = (person) => {
  return new Promise((resolve, reject) => {
    const newPerson = {id: uuidv4(), ...person};
    PERSONS.push(newPerson);
    writeDataToFile('data/index.json', PERSONS);
    resolve(newPerson);
  })
};

/**
 * Update an exisiting item
 * @param {any} data
 * @param {string | number} id
 * @returns {Promise}
 */
const update = (data, id) => {
  return new Promise((resolve, reject) => {
    const index = PERSONS
      .findIndex(item => item.id.toString() === id.toString());
    PERSONS[index] = {id, ...data};
    writeDataToFile('data/index.json', PERSONS);
    resolve(PERSONS[index]);
  })
};

/**
 * Remove an exisiting item by id
 * @param {string | number} id
 * @returns {Promise}
 */
const removeById = (id) => {
  return new Promise((resolve, reject) => {
    const updatedPersonsData = PERSONS
      .filter(item => item.id.toString() !== id.toString());
    writeDataToFile('data/index.json', updatedPersonsData);
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
