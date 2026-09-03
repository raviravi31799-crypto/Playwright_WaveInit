@Harini @Quiz
Feature: Trainer Quiz Management

Background:
    Given the user navigates to the application
    When the user clicks on trainer in the login menu
    When the user enters trainer "rahul@gmail.com" and "rahul1234"
    And the user clicks on sign in
    When The trainer opens the "My Trainings" menu
    And The trainer selects the first course
    And The trainer opens the "AI Quiz" tab


@createQuiz
Scenario Outline: Verify trainer can create quiz
    When The trainer clicks the "Create Manually" button
    And The trainer creates a quiz using the "<dataset>" dataset
    And The trainer saves the quiz as a draft
    Then The quiz should appear in the list with the expected question count and status "DRAFT" for the "<dataset>" dataset

Examples:
    | dataset   |
    | variables |
    | arrays    |
@EditQuiz
Scenario Outline: Verify trainer can edit an existing quiz
    When The trainer edits the quiz using the "<dataset>" dataset
    Then The trainer should see the updated quiz details for the "<dataset>" dataset

Examples:
    | dataset   |
    | variables |
    | arrays    |

@deleteQuiz
Scenario Outline: Verify trainer can delete existing quiz
    When The trainer deletes the quiz created from the "<dataset>" dataset
    Then The quiz should no longer be available in the list for the "<dataset>" dataset

Examples:
    | dataset   |
    | variables |
    | arrays|
