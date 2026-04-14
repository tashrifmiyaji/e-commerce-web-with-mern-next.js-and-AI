const { v4: uuidv4 } = require("uuid");

const generateGuestSessionId = () => {
  return uuidv4();
};

module.exports = generateGuestSessionId;
