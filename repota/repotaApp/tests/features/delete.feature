Feature: Delete a Report
  A Worker has a Report from a number of years ago
  As a Worker
  I no longer require this Report and I would like to delete it

  Scenario: Allow a worker to delete a Report
    Given worker is on the history page and wants to delete a report
    Then worker must open the report
    When worker clicks the delete button
    Then worker confirms the delete
    Then the report should be successfully deleted
