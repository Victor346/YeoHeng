Feature: Yeoheng

  Verify that the Yeoheng Webpage is displaying correctly

  Scenario: Check Website
    Given I am on the homepage
    Then Verify titles are correct
    When I click the hamburger menu
    Then I click on the login button and leave the menu

  Scenario: Login
    Given I am on the login page
    Then I login with test credentials
    Given I am on the events page
    Then I verify event titles are correct
    Then I verify demo cards are correct

  Scenario: Create Event
    Given I am on the create event page
    Then I fill the form

  Scenario: Create Trip
    Given I am on the events page
    When I click the hamburger menu
    Then I go to the trips option
    When I click on the register event button
    Then I fill the trip form
    And I submit the trip form
