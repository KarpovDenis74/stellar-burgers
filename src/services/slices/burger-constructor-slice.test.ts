import {
  addIngredient,
  burgerConstructorReducer,
  moveIngredientUp,
  moveIngredientDown,
  removeIngredient
} from './burger-constructor-slice';
import { TConstructorIngredient } from '@utils-types';

const bun: TConstructorIngredient = {
  _id: 'bun-1',
  name: 'Булка',
  type: 'bun',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 100,
  image: 'img',
  image_large: 'img',
  image_mobile: 'img',
  id: 'bun-id'
};

const mainA: TConstructorIngredient = {
  _id: 'main-1',
  name: 'Котлета',
  type: 'main',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 50,
  image: 'img',
  image_large: 'img',
  image_mobile: 'img',
  id: 'main-a'
};

const mainB: TConstructorIngredient = {
  ...mainA,
  _id: 'main-2',
  name: 'Сыр',
  id: 'main-b'
};

describe('burgerConstructor reducer', () => {
  it('добавляет ингредиент', () => {
    const stateWithBun = burgerConstructorReducer(
      undefined,
      addIngredient(bun)
    );
    const stateWithMain = burgerConstructorReducer(
      stateWithBun,
      addIngredient(mainA)
    );

    expect(stateWithBun.bun?._id).toBe('bun-1');
    expect(stateWithMain.ingredients).toHaveLength(1);
    expect(stateWithMain.ingredients[0]._id).toBe('main-1');
  });

  it('удаляет ингредиент из начинки', () => {
    const state = burgerConstructorReducer(
      {
        bun: null,
        ingredients: [mainA, mainB],
        orderRequest: false,
        orderModalData: null,
        orderError: null
      },
      removeIngredient('main-a')
    );

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].id).toBe('main-b');
  });

  it('меняет порядок ингредиентов в начинке', () => {
    const state = burgerConstructorReducer(
      {
        bun: null,
        ingredients: [mainA, mainB],
        orderRequest: false,
        orderModalData: null,
        orderError: null
      },
      moveIngredientDown(0)
    );

    expect(state.ingredients[0].id).toBe('main-b');
    expect(state.ingredients[1].id).toBe('main-a');
  });

  it('перемещает ингредиент вверх в начинке', () => {
    const state = burgerConstructorReducer(
      {
        bun: null,
        ingredients: [mainA, mainB],
        orderRequest: false,
        orderModalData: null,
        orderError: null
      },
      moveIngredientUp(1)
    );

    expect(state.ingredients[0].id).toBe('main-b');
    expect(state.ingredients[1].id).toBe('main-a');
  });
});
