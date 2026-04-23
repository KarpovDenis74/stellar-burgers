describe('Конструктор бургера', () => {
  const bunId = '643d69a5c3f7b9001cfa093c';
  const mainId = '643d69a5c3f7b9001cfa0941';
  const sauceId = '643d69a5c3f7b9001cfa0944';

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
    cy.get('[data-cy="ingredients-list"]').within(() => {
      cy.get(`[data-cy="ingredient-${bunId}"]`)
        .contains('Добавить')
        .click();
      cy.get(`[data-cy="ingredient-${mainId}"]`)
        .contains('Добавить')
        .click();
    });

    cy.get('[data-cy="burger-constructor"]').within(() => {
      cy.get('[data-cy="constructor-bun-top"]').should('exist');
      cy.get('[data-cy="constructor-bun-bottom"]').should('exist');
      cy.contains('Биокотлета из марсианской Магнолии').should('exist');
    });
  });

  it('открывает и закрывает модалку ингредиента (крестик и оверлей)', () => {
    cy.get('[data-cy="ingredients-list"]')
      .find(`[data-cy="ingredient-${bunId}"]`)
      .contains('Краторная булка N-200i')
      .click();

    cy.get('[data-cy="modal"]').within(() => {
      cy.contains('Детали ингредиента').should('exist');
      cy.get('[data-cy="ingredient-details"]').within(() => {
        cy.get('[data-cy="ingredient-name"]').should(
          'have.text',
          'Краторная булка N-200i'
        );
        cy.contains('Калории, ккал').should('exist');
      });
      cy.get('[data-cy="modal-close"]').click();
    });
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="ingredients-list"]')
      .find(`[data-cy="ingredient-${sauceId}"]`)
      .contains('Соус традиционный галактический')
      .click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
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

    cy.get('[data-cy="ingredients-list"]').within(() => {
      cy.get(`[data-cy="ingredient-${bunId}"]`)
        .contains('Добавить')
        .click();
      cy.get(`[data-cy="ingredient-${mainId}"]`)
        .contains('Добавить')
        .click();
    });

    cy.get('[data-cy="burger-constructor"]').contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get('[data-cy="modal"]').within(() => {
      cy.get('[data-cy="order-number"]').should('contain', '12345');
    });
    cy.get('body').type('{esc}');

    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('[data-cy="burger-constructor"]').within(() => {
      cy.get('[data-cy="constructor-empty-bun"]').should('exist');
      cy.get('[data-cy="constructor-empty-fillings"]').should('exist');
    });
  });
});
