const sckey = require("soundcloud-key-fetch");

const configKey = async () => {
  const key = await sckey.fetchKey();
  const keyResult = await sckey.testKey(key);
  return keyResult ? key : new Error("Key is invalid");
};

module.exports = { configKey };
