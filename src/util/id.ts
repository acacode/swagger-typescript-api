import * as nanoid from "nanoid";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

export const generateId = nanoid.customAlphabet(ALPHABET, 12);
