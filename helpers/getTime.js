const getMinutes = (duration) => {
  return Math.floor(duration / (1000 * 60));
};

const getSeconds = (duration) => {
  return Math.floor(duration / 1000);
};

const addZero = (str) => {
  return str.toString().length < 2 ? `0${str}` : str;
};

const getTime = (duration) => {
  return `${addZero(getMinutes(duration))}:${addZero(
    getSeconds(duration) - getMinutes(duration) * 60
  )}`;
};

module.exports = { getTime };
