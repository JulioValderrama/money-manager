import convertCurrency from '../services/apis/convert-currency';
import { AccountsStore } from '../models/accounts';

const accountsStore = new AccountsStore();

const getDefaultCurrency = async (accountId: number, currencyDefaultSymbol: string, amount: number) => {
  const currencyAccountSymbol = await accountsStore.getCurrencySymbol(accountId);
  const currencyDefaultConverted = await convertCurrency(
    currencyAccountSymbol.name,
    currencyDefaultSymbol,
    amount
  );
  return parseInt(currencyDefaultConverted as unknown as string);
};

export default getDefaultCurrency;
