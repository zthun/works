@SuspensePage
Feature: Suspense Page

Background:
  Given I navigate to the suspense demo page

@SuspensePage-Visibility
Scenario: Toggling the loading option shows and hides the suspense
  When I set the loading option to "<state>" on the suspense demo page
  Then the "<suspense>" suspense should be "<visibility>" on the suspense demo page
  Examples:
  |state|suspense|visibility|
  |checked|rotate|visible|
  |unchecked|rotate|hidden|

@SuspensePage-Width
Scenario: Selecting a width option should set the size of the suspense
  When I select the width, "<width>", from the width drop down on the suspense demo page
  Then the width of the "<suspense>" suspense should be "<width>" on the suspense demo page
  Examples:
  |width|suspense|
  |xs|rotate|
  |sm|rotate|
  |md|rotate|
  |lg|rotate|
  |xl|rotate|
