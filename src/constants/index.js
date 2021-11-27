const PARAMS_RULES = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
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
