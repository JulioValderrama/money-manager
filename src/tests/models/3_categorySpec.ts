import { Category, CategoryStore } from '../../models/category';

const store = new CategoryStore();

describe('------------------------------TESTING Category Model------------------------------', () => {
  describe('Testing CATEGORY methods exits \n', () => {
    it('should have CREATE() method', () => {
      expect(store.create).toBeDefined();
    });
  });

  describe('Testing CATEGORY Model CRUD API with Database \n', () => {
    const category: Category = {
      name: 'restaurants',
      category_type_id: 2
    };
    const category1: Category = {
      name: 'salary',
      category_type_id: 1
    };
    it('Should CREATE() create new CATEGORY', async () => {
      const result = await store.create(category);
      const result2 = await store.create(category1);
      expect(result.name).toEqual('restaurants');
      expect(result2.name).toEqual('salary');
    });
  });
});
