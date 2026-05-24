const handlebarsHelpers = {
  gte: (a, b) => Number(a) >= Number(b),
  gt: (a, b) => Number(a) > Number(b),
  lte: (a, b) => Number(a) <= Number(b),
  eq: (a, b) => a == b,
  multiply: (a, b) => {
    const value1 = Number(a) || 0;
    const value2 = Number(b) || 0;
    return (value1 * value2).toFixed(2);
  },
  sum: (a, b) => (a + b).toFixed(2),
  totalCart: (products) => {
    if (!Array.isArray(products)) return "0.00";
    const total = products.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);
    return total.toFixed(2);
  },
};

export default handlebarsHelpers;
