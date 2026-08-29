@Quiz
Feature: Trainer Quiz Management

Background:
    Given the user navigates to the application
    When the user clicks on trainer in the login menu
    When the user enters trainer "wavene20@gmail.com" and "sriram123@"
    And the user clicks on sign in
    When The trainer opens the "My Trainings" menu
    And The trainer selects the first course
    And The trainer opens the "AI Quiz" tab


Scenario Outline: Verify trainer can create a quiz manually

    When The trainer clicks the "Create Manually" button
    And The trainer creates a quiz using the "<dataset>" dataset
    And The trainer saves the quiz as a draft
    Then The quiz should appear in the list with the expected question count and status "DRAFT" for the "<dataset>" dataset

Examples:
    | dataset   |
    | variables |
    | arrays    |


Scenario Outline: Verify trainer can delete a quiz

    When The trainer clicks the "Create Manually" button
    And The trainer creates a quiz using the "<dataset>" dataset
    And The trainer saves the quiz as a draft
    Then The quiz should appear in the list with the expected question count and status "DRAFT" for the "<dataset>" dataset
    When The trainer deletes the quiz created from the "<dataset>" dataset
    Then The quiz should no longer be available in the list for the "<dataset>" dataset

Examples:
    | dataset   |
    | variables |
    | arrays    |