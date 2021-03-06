Feature: Registration
  As a unregistered User
  So that I can use Repota
  I need to create an Account

  Scenario Outline: Allow a new User to be registered
    Given new user navigates to the Register Page
    When new user enters username "<username>"
    When new user enters name "<name>"
    When new user enters password "<password>"
    Then user clicks the register button
    Then user should be successfully registered

    Examples:
      | username      | name     | password   |
      | bob_mock_test | Bob Mock | @Testing14 |
