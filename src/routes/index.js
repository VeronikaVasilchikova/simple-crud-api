const {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  removePerson
} = require('../controllers/personController');
const { validateId,
  handleClientError } = require('../utils');

const methodGet = (req, res) => {
  if (req.url.includes('/person')) {
    if (req.url === '/person') {
      getPersons(req, res);
    }
    else {
      validateId(req, res, getPerson);
    }
  }
  else {
    const errorMessage = `Sorry, requested route ${req.url} not found`;
    handleClientError(404, res, errorMessage);
  }
};

const methodPost = (req, res) => {
  if (req.url === '/person') {
    createPerson(req, res);
  }
  else {
    const errorMessage = `Sorry, requested route ${req.url} not found`;
    handleClientError(404, res, errorMessage);
  }
};

const methodPut = (req, res) => {
  if (req.url.includes('/person')) {
    validateId(req, res, updatePerson);
  }
  else {
    const errorMessage = `Sorry, requested route ${req.url} not found`;
    handleClientError(404, res, errorMessage);
  }
};

const methodDelete = (req, res) => {
  if (req.url.includes('/person')) {
    validateId(req, res, removePerson);
  }
  else {
    const errorMessage = `Sorry, requested route ${req.url} not found`;
    handleClientError(404, res, errorMessage);
  }
};

module.exports = {
  methodGet,
  methodPost,
  methodPut,
  methodDelete
}
