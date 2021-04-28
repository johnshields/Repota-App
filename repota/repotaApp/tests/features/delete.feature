Feature: Delete a Report
  As a Worker
  So that I can delete a report from a number of years ago
  I need to remove it from the Repota database.

  Scenario: Allow a Worker to delete a Report
    Given worker is on the history page and wants to delete a report
    Then worker must open the report
    When worker clicks the delete button
    Then worker confirms the delete
    Then the report should be successfully deleted
