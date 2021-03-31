Feature: Login
  In order to login to Repota
  As a User
  I need to enter the Valid username and Password

  Scenario Outline: Log a User into Repota
    Given user navigates to the Login Page
    When user enters username "<username>"
    When user enters password "<password>"
    Then user clicks the login button
    Then user should be successfully logged in to Repota

    Examples:
      | username  | password   |
      | test_user | @Testing14 |
