const PARAMS_RULES = /\/person\/([a-zA-Z0-9_.-]*$)/;
const REQUIRED_PROPERTIES = {
  name: {
    type: 'string'
  },
  age: {
    type: 'number'
  },
  hobbies: {
    type: 'object'
  }
};

module.exports = {
  PARAMS_RULES,
  REQUIRED_PROPERTIES
};
