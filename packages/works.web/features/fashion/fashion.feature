@FashionPage
Feature: Fashion Page

Scenario: Selecting a color updates the value
  Given I navigate to the fashion demo page
  When I select the color, "blue", with a shade of "600" on the fashion demo page
  Then the selected color value should be "Blue [600]" on the fashion demo page
