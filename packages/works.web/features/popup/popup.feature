@PopupPage
Feature: Popup Page

Scenario: The popup is opened when the toggler button is clicked
  Given I navigate to the popup demo page
  When I click the toggler button on the popup demo page
  Then the popup is opened on the popup demo page
