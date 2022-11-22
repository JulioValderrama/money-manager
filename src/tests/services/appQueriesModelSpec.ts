import { AppQueries } from '../../services/appQueriesModel';
import { CategoryTypeStore } from '../../models/category-type';

const appQueries = new AppQueries();
const category = new CategoryTypeStore();

describe('<<<<<<<<<<<<<<<<<< TESTING appQueriesModel >>>>>>>>>>>>>>>', () => {
  xit('should getBalanceInTotal("Income") get a list of Expenses included in Total', async () => {
    const result = await appQueries.getBalanceInTotal('Income');
    const list = await category.index();
    console.log(list);
    console.log(result);
    expect(result).toEqual('Expenses1');
  });
});
