Feature: Edit a Report
  As a Worker
  So that I can edit a Report
  I want to change some minor details

  Scenario Outline: Allow Worker to edit a Report
    Given worker is on the history page
    Then worker clicks on open
    Then worker clicks edit
    When worker edits date "<date>"
    When worker edits model "<model>"
    When worker edits reg "<reg>"
    When worker edits miles "<miles>"
    When worker edits location "<location>"
    When worker edits warranty box
    When worker edits cause "<cause>"
    When worker edits correction "<correction>"
    When worker edits parts "<parts>"
    When worker edits hours "<hours>"
    Then worker edits complete box
    Then worker clicks the edit button
    Then a report should be successfully edited

    Examples:
      | date       | model         | reg      | miles | location         | cause           | correction      | parts            | hours |
      | 02-04-2021 | Ford Focus ST | 15-G-643 | 23496 | Gort, Co. Galway | Worn out tyres. | Replaced tyres. | 4 Goodyear Tyres | 1     |
