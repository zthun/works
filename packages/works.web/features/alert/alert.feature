@AlertPage
Feature: Alert Page

Background:
  Given I navigate to the alert page

@AlertPage-LimitedAlerts
Scenario: When I click on the alert buttons, I should see the corresponding alert
  When I click the "<button>" button
  Then a "<severity>" alert is displayed
  And it automatically closes after a fixed interval
  Examples:
    |button|severity|
    |success|success|
    |error|error|
    |warning|warning|
    |info|info|


@AlertPage-ImmortalAlerts
Scenario: When I turn on the Immortal option and pop alerts, then they should stay there indefinitely
  And I have checked the Immortal switch
  When I click the "<button>" button
  Then a "<severity>" alert is displayed
  And it does not close after a fixed interval
  Examples:
    |button|severity|
    |success|success|
    |error|error|
    |warning|warning|
    |info|info|

@AlertPage-HeaderedAlerts
Scenario: When I turn on the Header option and pop alerts, then there should be a header for those alerts
  And I have checked the Header switch
  When I click the "<button>" button
  Then a "<severity>" alert is displayed
  And it contains a header, "<header>"
  Examples:
    |button|severity|header|
    |success|success|Success|
    |error|error|Error|
    |warning|warning|Warning|
    |info|info|Info|
