import axios from 'axios';

const convertCurrencyIUrl = 'https://api.exchangerate.host/convert';

const convertCurrency = async (currencyFrom: string, currencyTo: string, amount: number) => {
  const params = {
    from: currencyFrom,
    to: currencyTo,
    amount: amount
  };
  try {
    const result = await axios.get(convertCurrencyIUrl, { params: params });
    console.log(result.data.result);
    return result.data.result;
  } catch (err) {
    throw new Error(`Could not convert Currency. Error: ${err}`);
  }
};

export default convertCurrency;
