import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I am on the homepage', () => {
  cy.visit(Cypress.env('baseUrl'));
  cy.wait(1000);
});

Then('Verify titles are correct', () => {
  cy.get('.intro > .title').contains('YeoHeng');
  cy.get('.is-half > .is-3').contains('Events');
  cy.get(':nth-child(2) > .is-3').contains('Trips');
});

When('I click the hamburger menu', () => {
  cy.get('.is-fixed-top > .navbar-brand > .navbar-burger').should('be.visible');
  cy.get('.is-fixed-top > .navbar-brand > .navbar-burger').click();
});

Then('I click on the login button and leave the menu', () => {
  cy.get('.buttons > .is-light').should('be.visible');
  cy.get('.buttons > .is-light').click();
  cy.get('.is-fixed-top > .navbar-brand > .navbar-burger').click();
});

Given('I am on the login page', () => {
  cy.get(':nth-child(1) > .label').contains('Email');
  cy.get(':nth-child(2) > .label').contains('Password');
});

Then('I login with test credentials', () => {
  cy.get(':nth-child(1) > .control > .input').type(Cypress.env('username'));
  cy.get(':nth-child(2) > .control > .input').type(Cypress.env('password'));
  cy.get(':nth-child(3) > .button').click();
});

Given('I am on the events page', () => {
  cy.wait(2000);
});

Then('I verify event titles are correct', () => {
  cy.get(':nth-child(1) > section.has-text-left > .has-text-left > .title').contains('My events');
  cy.get('[style="margin-top: 10px;"] > .is-success').should('be.visible');
  cy.get('[style="padding-top: 10px;"] > .has-text-left > .title').contains('All events');
});

Then('I verify demo cards are correct', () => {
  let i = 2;
  const cypressCardCss = `:nth-child(${i}) > .card > .card-content >`;

  cy.get(cypressCardCss + ' .media > .media-content > .title').contains('Test Event');
  cy.get(cypressCardCss + ' .media > .media-content > .subtitle').contains('París');
  cy.get(cypressCardCss + ' .content > p').contains('This is a test event');
  cy.get(cypressCardCss + ' .content > .tags > :nth-child(1) > span').contains('example');

});

Given('I am on the create event page', () => {
  cy.get('[style="margin-top: 10px;"] > .is-success').click();
  cy.wait(1000);
  cy.get('.is-2').contains('Register a new event');
});

Then('I fill the form', () => {
  cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > .control > .input').type('Test Event');
  cy.get('.textarea').type('This is a test event. Sorry for using the current image.')

  cy.get(':nth-child(3) > .autocomplete > .control > .input').type('Paris, France');
  // cy.get('.dropdown-content > :nth-child(1) > div').should('be.visible');
  cy.get('.dropdown-content > :nth-child(1) > div').click();

  cy.get(':nth-child(4) > .control > .input').type('4500.00');
  cy.get('.field > :nth-child(1) > .input').type('3');
  cy.get(':nth-child(3) > .input').type('15');

  cy.get('select').select('Sports').should('have.value', 'Sports');

  cy.get('.taginput-container > .autocomplete > .control > .input').type('example');

  cy.get('.file-label > input').attachFile('pekora.jpg');

  cy.get('.column > .button').click();
});

Then('I go to the trips option', () => {
  cy.get('[href="/trips"]').click();
  cy.wait(1000);
  cy.get('#main-title').contains('Trips');
});

When('I click on the register event button', () => {
  cy.get('[style="margin-top: 25px; margin-left: 5%;"] > .button').click();
  cy.wait(1000);
  cy.get('.modal-card-title').contains('Register new trip');
});

Then('I fill the trip form', () => {
  cy.get('.columns > :nth-child(1) > :nth-child(1) > .control > .input').type('Test Trip');
  cy.get(':nth-child(2) > .datepicker > .dropdown > .dropdown-trigger > .control > .input').click();
  cy.get(':nth-child(2) > .datepicker > .dropdown > .dropdown-menu > .dropdown-content > .dropdown-item > :nth-child(1) > .datepicker-content > .datepicker-table > .datepicker-body > :nth-child(3) > .is-today')
    .click();
  cy.get(':nth-child(3) > .datepicker > .dropdown > .dropdown-trigger > .control > .input').click();
  cy.get(':nth-child(3) > .datepicker > .dropdown > .dropdown-menu > .dropdown-content > .dropdown-item > :nth-child(1) > .datepicker-content > .datepicker-table > .datepicker-body > :nth-child(4) > :nth-child(6)')
    .click();
  cy.get('.autocomplete > .control > .input').type('Paris, France');
  cy.get('.check').click();
});

And('I submit the trip form', () => {
  cy.get('.modal-card-foot > .button').click();
  cy.wait(1000);
});
