@Harini 
Feature: Create Training Session
Background: 
    Given the admin navigates to the Training Programs page
@CreateTraining 
Scenario: Verify the training session is created with valid details
    When the admin clicks the Add Training button
    And the admin fills all mandatory training details
    And the admin clicks the Create Training Session button 
    Then the training session should be created successfully 
    And the new training should be displayed in the list
 @ViewTraining
  Scenario: Verify the admin can view training session details
    When the admin clicks the View icon for the training
    Then the training details should be displayed
    When the admin clicks the Close button
    Then the training details should be closed
 @EditTraining
Scenario: Verify the admin can edit all training details
    When the admin clicks the Edit Training button
    And the admin edits all training details
    And the admin clicks the Save Changes button
    Then the training details should be updated successfully
