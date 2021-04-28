Feature: Login
  As a User
  So that I can access my reports
  I need to login with my valid Username and Password

  Scenario Outline: Login User
    Given user navigates to the Login Page
    When user enters username "<username>"
    When user enters password "<password>"
    Then user clicks the login button
    Then user should be successfully logged in

    Examples:
      | username      | password   |
      | bob_mock_test | @Testing14 |



