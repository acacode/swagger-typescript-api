export const sortByProperty =
  (propertyName: string) =>
  (o1: Record<string, any>, o2: Record<string, any>): 1 | -1 | 0 => {
    if (o1[propertyName] > o2[propertyName]) {
      return 1;
    }
    if (o1[propertyName] < o2[propertyName]) {
      return -1;
    }
    return 0;
  };
