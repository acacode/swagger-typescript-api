/**
 * @param propertyName {string}
 * @returns {(o1: Record<string, any>, o2: Record<string, any>) => 1 | -1 | 0}
 */
const sortByProperty = (propertyName) => (o1, o2) => {
  if (o1[propertyName] > o2[propertyName]) {
    return 1;
  }
  if (o1[propertyName] < o2[propertyName]) {
    return -1;
  }
  return 0;
};

module.exports = {
  sortByProperty,
};
