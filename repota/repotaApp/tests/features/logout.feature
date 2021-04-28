Feature: Logout
  As a User
  So I can logout since my work is done
  I need to click the hamburger menu and then click the logout button

  Scenario: Logout User
    Given user is on any page
    When user clicks the hamburger menu
    Then user clicks the logout button
    Then user should be logged out successfully
