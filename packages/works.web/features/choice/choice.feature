@ChoicePage
Feature: Choice Page

Background:
  Given I navigate to the choice demo page

@ChoicePage-Select
@ChoicePage-Select-Single
Scenario: Selecting an item updates the value
  When I clear the existing selection on the "<choice>" on the choice demo page
  And I select "<text>" on the "<choice>" on the choice demo page
  Then the values should be updated to "<values>" on the choice demo page
  Examples:
  |choice|text|values|
  |dropdown|Cyborg (Vic Stone)|cyborg|
  |autocomplete|Superman (Clark Kent)|superman|

@ChoicePage-Select
@ChoicePage-Select-Multiple
Scenario: Selection multiple items updates the values
  When I clear the existing selection on the "<choice>" on the choice demo page
  And I check the "multiple" option on the choice demo page
  And I select "<first>" on the "<choice>" on the choice demo page
  And I select "<second>" on the "<choice>" on the choice demo page
  Then the values should be updated to "<values>" on the choice demo page
  Examples:
  |choice|first|second|values|
  |dropdown|Cyborg (Vic Stone)|Green Lantern (Hal Jordan)|cyborg,green-lantern|
  |autocomplete|Wonder Woman (Diana Prince)|Batman (Bruce Wayne)|wonder-woman,batman|

@ChoicePage-Option
@ChoicePage-Option-Disabled
Scenario: Checking the disabled option disables the choice demos
  When I check the "disabled" option on the choice demo page
  Then the "dropdown" should be disabled on the choice demo page
  And the "autocomplete" should be disabled on the choice demo page

@ChoicePage-Option
@ChoicePage-Option-Indelible
Scenario: Checking the indelible option removes the clear button
  When I check the "indelible" option on the choice demo page
  Then the "dropdown" should be indelible
  And the "autocomplete" should be indelible
