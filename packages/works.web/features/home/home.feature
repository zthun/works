@HomePage
Feature: Home Page

Background:
  Given I open the learn application
  And I navigate to the home page

Scenario: Should be able to navigate to the Web Apps page by clicking on the Get Started button under the Web Apps card
  When I click the Get Started button under Web Apps
  Then I am navigated to the Web Apps page

Scenario: Should be able to navigate to the Microservices page by click on the Get Started button under the Microservices card
  When I click the Get Started button under Microservices
  Then I am navigated to the Microservices page
