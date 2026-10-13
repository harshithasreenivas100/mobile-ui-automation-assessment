Feature: Mobile logout

  @smoke @regression
  Scenario: Logout from the application
    Given User is logged in successfully
    When User attempts to logout from the app
    Then User is navigated to Login page
