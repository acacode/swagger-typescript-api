export const getRandomInt = (min = 0, max = 1) => {
  if (min === max) return min;

  return Math.round(Math.random() * (max - min) + min);
};
