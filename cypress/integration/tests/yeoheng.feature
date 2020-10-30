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
    Then I verify event titles are correct
    Then I verify demo cards are correct

