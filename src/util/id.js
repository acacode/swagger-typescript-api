import * as nanoid from "nanoid";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

const generateId = nanoid.customAlphabet(ALPHABET, 12);

export { generateId };
