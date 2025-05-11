const EMPLOYED_STATUS_VALUE = 'EMPLOYED';
const UNEMPLOYED_STATUS_VALUE = 'UNEMPLOYED';

describe('Loan Application Form E2E Tests', () => {
  const API_URL = 'http://localhost:3333/api/loans/generate';

  beforeEach(() => {
    cy.visit('/application');
    cy.intercept('POST', API_URL).as('loanOfferAPI');
  });

  context('Step 1: Personal Details', () => {
    it('should display "Step 1 of 2" and default employment-related fields', () => {
      cy.contains('Step 1 of 2').should('be.visible');
      cy.contains('Employer Name').should('be.visible');
    });

    it('should show required field errors on empty submission of Step 1', () => {
      cy.get('[data-cy="next-button"]').click();
      cy.contains('First name is required.').should('be.visible');
      cy.contains('Last name is required.').should('be.visible');
      cy.contains('Email is required.').should('be.visible');
      cy.contains('Employer name is required.').should('be.visible');
    });

    it('should toggle Employer Name field based on Employment Status and validate accordingly', () => {
      // Initially visible
      cy.contains('Employer Name').should('be.visible');

      // Change to Unemployed - Employer Name hides
      cy.get('[data-cy="employment-status-input"]').select(
        UNEMPLOYED_STATUS_VALUE
      );
      cy.get('[data-cy="employer-name-input"]').should('not.exist');

      // Fill other fields for step 1 to be valid (except employer name)
      cy.get('[data-cy="first-name-input"]').type('Test');
      cy.get('[data-cy="last-name-input"]').type('User');
      cy.get('[data-cy="email-input"]').type('valid@email.com');
      // No need to select employment status again if it's already UNEMPLOYED

      cy.get('[data-cy="next-button"]').click();
      // No error for employerName should exist, and we should proceed to step 2
      cy.get('[data-cy="employer-name-input-error"]').should('not.exist');
      cy.contains('Step 2 of 2').should('be.visible');
    });

    it('should proceed to Step 2 if Step 1 data is valid', () => {
      cy.get('[data-cy="first-name-input"]').type('John');
      cy.get('[data-cy="last-name-input"]').type('Doe');
      cy.get('[data-cy="email-input"]').type('john.doe@example.com');
      cy.get('[data-cy="employment-status-input"]').select(
        EMPLOYED_STATUS_VALUE
      );
      cy.get('[data-cy="employer-name-input"]').type('Acme Corp');

      cy.get('[data-cy="next-button"]').click();
      cy.contains('Step 2 of 2').should('be.visible');
    });
  });
});
