@HomePage
Feature: Home Page

Background:
  Given I navigate to the home page

Scenario: Should be able to navigate to the Web Apps page by clicking on the Get Started button under the Web Apps card
  When I click the Get Started button under "webApps" on the home page
  Then I am navigated to the Web Apps page from the home page

Scenario: Should be able to navigate to the Microservices page by click on the Get Started button under the Microservices card
  When I click the Get Started button under "microservices" on the home page
  Then I am navigated to the Microservices page from the home page
