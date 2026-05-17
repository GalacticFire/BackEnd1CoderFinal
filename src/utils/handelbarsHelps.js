const handlebarsHelpers = {
  gte: (a, b) => Number(a) >= Number(b),
  gt: (a, b) => Number(a) > Number(b),
  lte: (a, b) => Number(a) <= Number(b),
  eq: (a, b) => a == b,
};

export default handlebarsHelpers;
