@ListPage
Feature: List Page

Background:
  Given I open the learn application
  And I navigate to the list demo page

Scenario: An alert is opened when the supported list items are clicked
  When I click the "<item>" item on the list demo page
  Then an alert of severity, "<severity>", is displayed on the list demo page
  Examples:
  |item|severity|
  |everything|success|
  |text-only|warning|
