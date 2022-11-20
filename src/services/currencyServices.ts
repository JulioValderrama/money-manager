import { CurrencyStore } from '../models/currency';

const createAllSymbols = async () => {
  try {
    const store = new CurrencyStore();
    const result = await store.createAll();
    console.log(`${result.length} Symbols from external API copied to Database currency table`);
  } catch (err) {
    throw new Error(`Could not fetch Symbols from external API. Error: ${err}`);
  }
};

export default createAllSymbols;
