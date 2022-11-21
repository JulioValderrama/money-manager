import { Category, CategoryStore } from '../../models/category';

const store = new CategoryStore();

describe('------------------------------TESTING Category Model------------------------------', () => {
  describe('Testing CATEGORY methods exits \n', () => {
    it('should have INDEX() method', () => {
      expect(store.index).toBeDefined();
    });
    it('should have SHOW() method', () => {
      expect(store.show).toBeDefined();
    });
    it('should have CREATE() method', () => {
      expect(store.create).toBeDefined();
    });
    it('should have DELETE() method', () => {
      expect(store.delete).toBeDefined();
    });
  });

  describe('Testing CATEGORY Model CRUD API with Database \n', () => {
    const category: Category = {
      name: 'restaurants',
      category_type_id: 1
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
    it('should INDEX() show a list of CATEGORY', async () => {
      const result = await store.index();
      expect(result.length).toEqual(3);
    });
    it('should SHOW() method get the CATEGORY with id provided', async () => {
      const result = await store.show('1');
      expect(result.name).toEqual('Income');
    });
    it('should DELETE() method delete CATEGORY with id provided', async () => {
      const result = await store.delete('3');
      expect(result.name).toEqual('restaurants');
    });
  });
});
