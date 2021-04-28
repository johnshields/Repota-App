Feature: Create a Report
  As a Worker
  So that I can have a report on a vehicle I serviced
  I want to add the report to the Repota database for safe keeping

  Scenario Outline: Allow Worker to create a Report
    Given worker is on the create page
    When worker types in date "<date>"
    When worker types in model "<model>"
    When worker types in reg "<reg>"
    When worker types in miles "<miles>"
    When worker types in location "<location>"
    When worker checks the warranty box
    When worker types in customer name "<customerName>"
    When worker types in complaint "<complaint>"
    When worker types in cause "<cause>"
    When worker types in correction "<correction>"
    When worker types in parts "<parts>"
    When worker types in hours "<hours>"
    Then worker checks the complete box
    Then worker clicks the create button
    Then a report should be successfully created

    Examples:
      | date       | model      | reg      | miles | location     | customerName | complaint                   | cause           | correction      | parts            | hours |
      | 01-04-2021 | Ford Focus | 15-G-643 | 23476 | Gort, Galway | Tony Keely   | Tyres have lost their grip. | Worn out tyres. | Replaced tyres. | 4 Goodyear Tyres | 1     |
