describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.window().then((win) => {
      win.localStorage.removeItem('refreshToken');
    });
  });

  it('добавляет булку и начинку в конструктор', () => {
    cy.contains('Краторная булка N-200i')
      .parents('li')
      .within(() => cy.contains('Добавить').click());

    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .within(() => cy.contains('Добавить').click());

    cy.contains('Краторная булка N-200i (верх)').should('exist');
    cy.contains('Краторная булка N-200i (низ)').should('exist');
    cy.contains('Биокотлета из марсианской Магнолии').should('exist');
  });

  it('открывает и закрывает модалку ингредиента (крестик и оверлей)', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.contains('Краторная булка N-200i').should('exist');
    cy.contains('Калории, ккал').should('exist');

    cy.contains('Детали ингредиента')
      .parent()
      .find('button')
      .first()
      .click();
    cy.contains('Детали ингредиента').should('not.exist');

    cy.contains('Соус традиционный галактический').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('body').click(5, 5);
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('создаёт заказ, показывает номер и очищает конструктор', () => {
    cy.setCookie('accessToken', 'Bearer test-access-token');
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'test-refresh-token');
    });

    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.reload();
    cy.wait('@getIngredients');
    cy.wait('@getUser');

    cy.contains('Краторная булка N-200i')
      .parents('li')
      .within(() => cy.contains('Добавить').click());
    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('li')
      .within(() => cy.contains('Добавить').click());

    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.contains('12345').should('exist');
    cy.get('body').type('{esc}');

    cy.contains('идентификатор заказа').should('not.exist');
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
