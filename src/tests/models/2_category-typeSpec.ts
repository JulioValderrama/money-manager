import { CategoryTypeStore } from '../../models/category-type';

const store = new CategoryTypeStore();

describe('------------------------------TESTING Category_Type Model------------------------------', () => {
  describe('Testing CATEGORY_TYPE methods exits \n', () => {
    it('should have CREATE() method', () => {
      expect(store.create).toBeDefined();
    });
  });

  describe('Testing USER Model CRUD API with Database \n', () => {
    it('Should CREATE() create new USER', async () => {
      const result = await store.create('income');
      const result2 = await store.create('expenses');
      expect(result.name).toEqual('income');
      expect(result2.name).toEqual('expenses');
    });
  });
});
