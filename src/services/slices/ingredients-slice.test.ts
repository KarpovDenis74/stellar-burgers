import { fetchIngredients, ingredientsReducer } from './ingredients-slice';
import { TIngredient } from '@utils-types';

const ingredientsMock: TIngredient[] = [
  {
    _id: 'ingredient-1',
    name: 'Ингредиент',
    type: 'main',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 10,
    price: 10,
    image: 'img',
    image_large: 'img',
    image_mobile: 'img'
  }
];

describe('ingredients reducer', () => {
  it('ставит isLoading=true при request', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.pending('', undefined)
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('сохраняет данные и ставит isLoading=false при success', () => {
    const loadingState = ingredientsReducer(
      undefined,
      fetchIngredients.pending('', undefined)
    );
    const state = ingredientsReducer(
      loadingState,
      fetchIngredients.fulfilled(ingredientsMock, '', undefined)
    );

    expect(state.items).toEqual(ingredientsMock);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('сохраняет ошибку и ставит isLoading=false при failed', () => {
    const loadingState = ingredientsReducer(
      undefined,
      fetchIngredients.pending('', undefined)
    );
    const error = new Error('request failed');
    const state = ingredientsReducer(
      loadingState,
      fetchIngredients.rejected(error, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('request failed');
  });
});
