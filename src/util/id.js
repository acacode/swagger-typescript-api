const { customAlphabet } = require("nanoid");

const ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

const generateId = customAlphabet(ALPHABET, 12);

module.exports = {
  generateId,
};
