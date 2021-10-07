/// <reference types="cypress" />


describe('Hello World', () => {
  it('test one', () => {
    cy.visit('http://localhost:3000')

    cy.contains('add to outfit').click()

    // cy.get('[data-testid="comparison-modal"]').click()

  })
})

