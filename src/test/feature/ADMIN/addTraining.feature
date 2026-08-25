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
    