Feature: Logout User
  In order to logout of Repota
  As a User
  I need to click the hamburger menu and then click the logout button

  Scenario: Allow a new User to Logout
    Given user is on any page
    When user clicks the hamburger menu
    Then user clicks the logout button
    Then user should be logged out successfully
