const getRandomColor = () =>
  '#' + ((Math.random() * Math.pow(255, 3)) << 0).toString(16);

export { getRandomColor };
