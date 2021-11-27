const fs = require('fs');
const path = require('path');
const { REQUIRED_PROPERTIES, PARAMS_RULES } = require('../constants');
const params = new RegExp(PARAMS_RULES);

/**
 * Write data to a file which is an artificial database
 * @param {string} filename
 * @param {any} data
 * @returns {void}
 */
const writeDataToFile = (filename, data) => {
  let dirName;
  if (process.argv[2] === 'development' || global.__DEV__) {
    const distNameArray = __dirname.split('\\');
    distNameArray.pop();
    dirName = distNameArray.join('\\');
  }
  else if (process.argv[2] === 'production') {
    dirName = __dirname;
  }
  else {
    throw new Error(`Have no access to ${filename}`);
  }
  const filePath = path.resolve(dirName, filename);
  if (fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8', (error) => {
      if (error) {
        throw new Error(`${error}`);
      }
    });
  }
  else {
    throw new Error(`Have no access to ${filePath}`);
  }
};

/**
 * Get requested body
 * @param {any} req
 * @returns {void}
 */
const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        resolve(body);
      });
    }
    catch(error) {
      reject(error);
    }
  });
};

/**
 * Method to handle server error
 * @param {any} res
 * @param {any} error
 * @returns {void}
 */
const handleServerError = (res, error) => {
  res.writeHead(500, 'Content-Type', 'application/json');
  res.end(JSON.stringify({message: error.message}));
};

/**
 * Method to handle server error
 * @param {number} statusCode
 * @param {any} res
 * @param {string} errorMessage
 * @returns {void}
 */
const handleClientError = (statusCode, res, errorMessage) => {
  res.writeHead(statusCode, 'Content-Type', 'application/json');
  res.end(JSON.stringify({message: errorMessage}));
};

/**
 * Filter necessary properties
 * @param {any} body
 * @returns {any}
 */
const filterNecessaryProperties = (body) => {
  const requiredPropNames = Object.keys(REQUIRED_PROPERTIES);
  return Object.keys(body).reduce((acc, item) => {
    if (requiredPropNames.includes(item)) {
      acc[item] = body[item];
    }
    return acc;
  }, {});
};

/**
 * Check required properties
 * @param {any} body
 * @returns {boolean | string}
 */
const checkRequiredProperties = (body) => {
  const bodyKeys = Object.keys(body);
  const requiredPropNames = Object.keys(REQUIRED_PROPERTIES);
  const result = requiredPropNames.reduce((acc, prop) => {
    const propObj = {};
    if (bodyKeys.includes(prop)) {
      propObj[prop] = true;
      acc.push(propObj);
    }
    else {
      propObj[prop] = false;
      acc.push(propObj);
    }
    return acc;
  }, []);

  if (result.every(item => Object.values(item)[0])) {
    return true;
  }
  else {
    return result
      .filter(item => !Object.values(item)[0])
      .map(item => Object.keys(item)[0])
      .join(', ');
  };
};

/**
 * Check properties types
 * @param {any} body
 * @returns {boolean | string}
 */
const checkPropertiesTypes = (body) => {
  const bodyEntries = Object.entries(body);
  const result = bodyEntries.reduce((acc, [key, value]) => {
    const propObj = {};
    if (typeof value === REQUIRED_PROPERTIES[key].type) {
      if (typeof value === 'object') {
        if (Array.isArray(value)
          && (value.length === 0 || value.every(item => typeof item === 'string'))
        ) {
          propObj[key] = false;
          acc.push(propObj);
        }
        else {
          propObj[key] = `${key} should be empty array or array with string items`;
          acc.push(propObj);
        }
      }
      else {
        propObj[key] = false;
        acc.push(propObj);
      }
    }
    else {
      propObj[key] = `${key} should be ${REQUIRED_PROPERTIES[key].type}`;
      acc.push(propObj);
    }
    return acc;
  }, []);
  if (result.every(item => !Object.values(item)[0])) {
    return true;
  }
  else {
    return result
      .filter(item => Object.values(item)[0])
      .map(item => Object.values(item)[0])
      .join(', ');
  };
};

const validateId = (req, res, method) => {
  const urlArray = req.url.split('/person/');
  if (urlArray[0] === '' && urlArray.length === 2) {
    const personId = urlArray[1];
    if (params.test(personId)) {
      method(req, res, personId);
    }
    else {
      const errorMessage = `Sorry, id ${personId} is invalid`;
      handleClientError(400, res, errorMessage);
    }
  }
  else {
    const errorMessage = `Sorry, requested route ${req.url} not found`;
    handleClientError(404, res, errorMessage);
  }
};

module.exports = {
  writeDataToFile,
  getPostData,
  handleServerError,
  handleClientError,
  filterNecessaryProperties,
  checkRequiredProperties,
  checkPropertiesTypes,
  validateId
};
