import axios from 'axios';

const currencySymbolsUrl = 'https://api.exchangerate.host/symbols';

const currencySymbols = async () => {
  try {
    const result = await axios.get(currencySymbolsUrl);
    return Object.keys(result.data.symbols);
  } catch (err) {
    throw new Error(`Could not get Currency Symbols. Error: ${err}`);
  }
};

export default currencySymbols;
