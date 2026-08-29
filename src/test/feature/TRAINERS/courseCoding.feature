Feature:Course_Coding
Background:
    Given The user launches the application
    And the user logs in as Trainer
    And the user clicks the Course 
    And navigates to the coding module
@createCodingAssessment
Scenario: Verify Create Assessment option in Coding module
When the trainer clicks on the Create Assessment button
Then a new coding assessment should be added to the assessment list
@GenerateWithAI
Scenario: Verify coding assessment generation using AI
When the trainer initiates AI-based assessment generation
And the trainer provides the required information
And the trainer generates the assessment
Then the coding assessment should be generated successfully
@EditAssessment
  Scenario: Edit an existing coding assessment 
    When the trainer clicks the Edit button for an existing coding assessment
    And the trainer clicks the Edit button in the assessment details
    And the trainer updates the assessment details
    And the trainer clicks the Save button
    Then the updated assessment details should be displayed in the assessment list
@ViewAssessment
Scenario: Verify viewing of a coding assessment
When the trainer selects the view option for an assessment
Then the assessment details should be displayed
@ConfirmDelete
Scenario: Verify successful assessment deletion
Given the delete assessment confirmation is displayed
When the trainer confirms the delete action
Then the assessment should be removed from the assessment list

@CancelDelete
Scenario: Verify cancellation of assessment deletion
Given the delete assessment confirmation is displayed
When the trainer cancels the delete action
Then the assessment should remain in the assessment list