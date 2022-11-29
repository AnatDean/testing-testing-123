const { divide } = require("./operations/named.exports.index");
const calculate = require("./calculator");

const makePayment = (price, fundsInPennies) => {
  const fundsInPounds = calculate(fundsInPennies, divide, 100);
  fundsInPounds -= price;
  return { success: 200 };
};

export default makePayment;
