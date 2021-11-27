const fs = require('fs');
const { REQUIRED_PROPERTIES } = require('../constants');

const writeDataToFile = (filename, data) => {
  if (fs.existsSync(filename)) {
    fs.writeFileSync(filename, JSON.stringify(data), 'utf-8', (error) => {
      if (error) {
        throw new Error(`${error}`);
      }
    });
  }
  else {
    throw new Error(`Have no access to ${filename}`);
  }
};

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

const handleServerError = (res, error) => {
  res.writeHead(500, 'Content-Type', 'application/json');
  res.end(JSON.stringify({message: error.message}));
};

const handleClientError = (statusCode, res, errorMessage) => {
  res.writeHead(404, 'Content-Type', 'application/json');
  res.end(JSON.stringify({message: errorMessage}));
};

const filterNecessaryProperties = (body) => {
  const requiredPropNames = Object.keys(REQUIRED_PROPERTIES);
  return Object.keys(body).reduce((acc, item) => {
    if (requiredPropNames.includes(item)) {
      acc[item] = body[item];
    }
    return acc;
  }, {});
};

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

module.exports = {
  writeDataToFile,
  getPostData,
  handleServerError,
  handleClientError,
  filterNecessaryProperties,
  checkRequiredProperties,
  checkPropertiesTypes
};
