@TextPage
Feature: Button Page

Background:
  Given I navigate to the text demo page

@TextPage-Value
Scenario: Entering in text should set the value field.
  When I enter the text "Lorem Ipsum" into the "<name>" field on the text demo page
  Then the value of the "<name>" field should be "Lorem Ipsum" on the text demo page
  Examples:
    |name|
    |text|
    |password|
    |reveal|
    |area|

@TextPage-Value
Scenario: Entering in text into the text area should allow for multi line.
  When I enter multiple lines into the text area on the text demo page
  Then the value of area should be separated by two new lines on the text demo page

@TextPage-Mask
Scenario: Clicking the reveal button should show reveal the text
  When I click the reveal button on the reveal field on the text demo page
  Then I should be able to see the text on the reveal field on the text demo page

@TextPage-Option
@TextPage-Option-Disabled
Scenario: Checking the disabled switch should disable all inputs.
  When I check the "disabled" option on the text demo page
  Then the "text" field is disabled on the text demo page
  And the "password" field is disabled on the text demo page
  And the "reveal" field is disabled on the text demo page
  And the "area" field is disabled on the text demo page

@TextPage-Option
@TextPage-Option-ReadOnly
Scenario: Checking the read only switch should make all inputs read only.
  When I check the "readOnly" option on the text demo page
  Then the "text" field is read only on the text demo page
  And the "password" field is read only on the text demo page
  And the "reveal" field is read only on the text demo page
  And the "area" field is read only on the text demo page

@TextPage-Option
@TextPage-Option-Required
Scenario: Checking the required switch should make all inputs required.
  When I check the "required" option on the text demo page
  Then the "text" field is required on the text demo page
  And the "password" field is required on the text demo page
  And the "reveal" field is required on the text demo page
  And the "area" field is required on the text demo page

@TextPage-Option
@TextPage-Option-Adornments
Scenario: Checking the adornments switch should add adornments to all inputs.
  When I check the "adornments" option on the text demo page
  Then the "text" field has adornments on the text demo page
  And the "password" field has adornments on the text demo page
  And the "reveal" field has adornments on the text demo page
  And the "area" field has adornments on the text demo page
