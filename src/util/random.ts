export const getRandomFloat = (min = 0, max = 1) => {
  return Math.random() * (max - min) + min;
};

export const getRandomInt = (min = 0, max = 1) => {
  if (min === max) return min;

  return Math.round(getRandomFloat(min, max));
};
