@DrawerPage
Feature: Drawer Page

Background:
  Given I navigate to the drawer demo page

@DrawerPage-Open
Scenario: The drawer is opened to an anchored position when the button is clicked
  When I anchor the drawer to the "<anchor>" on the drawer demo page
  And I click the drawer button on the drawer demo page
  Then the drawer is opened on the "<anchor>" on the drawer demo page
  Examples:
    |anchor|
    |left|
    |right|
    |top|
    |bottom|

@DrawerPage-Close
Scenario: The drawer is closed when the button inside the drawer is clicked
  When I click the drawer button on the drawer demo page
  And I click the close button on the drawer on the drawer demo page
  Then the drawer is closed on the drawer demo page
