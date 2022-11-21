import { CategoryType, CategoryTypeStore } from '../../models/category-type';

const store = new CategoryTypeStore();

describe('------------------------------TESTING Category_Type Model------------------------------', () => {
  describe('Testing CATEGORY_TYPE methods exits \n', () => {
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

  describe('Testing CATEGORY-TYPE Model CRUD API with Database \n', () => {
    const categoryType: CategoryType = {
      name: 'Income1'
    };
    const categoryType2: CategoryType = {
      name: 'Expenses1'
    };
    it('Should CREATE() create new CATEGORY-TYPE', async () => {
      const result = await store.create(categoryType);
      const result2 = await store.create(categoryType2);
      expect(result.name).toEqual('Income1');
      expect(result2.name).toEqual('Expenses1');
    });
    it('should INDEX() show a list of CATEGORY-TYPE', async () => {
      const result = await store.index();
      expect(result.length).toEqual(3);
    });
    it('should SHOW() method get the CATEGORY-TYPE with id provided', async () => {
      const result = await store.show('3');
      expect(result.name).toEqual('Income1');
    });
    it('should DELETE() method delete CATEGORY-TYPE with id provided', async () => {
      const result = await store.delete('3');
      expect(result.name).toEqual('Income1');
    });
  });
});
