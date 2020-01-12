const getRandomColor = () =>
  '#' + ((Math.random() * Math.pow(255, 3)) << 0).toString(16);

const pick = (fields, obj) =>
  fields.reduce((result, key) => ({ ...result, [key]: obj[key] }), {});

const shallowCompare = (obj1, obj2) =>
  Object.keys(obj1).every(key => obj1[key] === obj2[key]);

export { getRandomColor, pick, shallowCompare };
