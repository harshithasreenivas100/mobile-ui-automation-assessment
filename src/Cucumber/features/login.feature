Feature: Mobile login

  @smoke @regression
  Scenario: Login with valid credentials
    Given App is launched successfully
    When User attempts to login with username "standard_user" and password "secret_sauce"
    Then User is navigated to product page

  @regression
  Scenario: Login with invalid credentials
    Given App is launched successfully
    When User attempts to login with username "invalid_user" and password "wrong_password"
    Then Login error message is displayed
    And Login error message says "Username and password do not match any user in this service."
