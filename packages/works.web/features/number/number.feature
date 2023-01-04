@NumberPage
Feature: Number Page

Background:
  Given I navigate to the number demo page

@NumberPage-Value
@debug
Scenario: Setting the value on the inputs updates the page value
  And I start with a value of "<start>" on the number demo page
  When I "<direction>" the value of the "<input>" input by "<step>" on the number demo page
  Then the value should be "<result>" on the number demo page
  Examples:
  |start|direction|input|step|result|
  |200|increment|spinner|4|204|
  |60|decrement|spinner|6|54|

@NumberPage-Clear
Scenario: Clearing the inputs clears the value
  And I start with a value of "200" on the number demo page
  When I clear the "spinner" input on the number demo page
  Then the value should be cleared on the number demo page
