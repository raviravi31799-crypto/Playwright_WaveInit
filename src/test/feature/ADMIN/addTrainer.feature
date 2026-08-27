@Subha

Feature: Create Trainer Account in Admin Module - Subhashree-25/08/2026

Background:
    Given the admin navigates to the Trainers page

@CreateTrainerValidDetails
Scenario: Verify trainer is created successfully with valid details
    When the admin clicks the Add Trainer button
    And the admin fills all trainer details with valid data
    And the admin clicks the Create Trainer button
    Then the trainer should be created successfully

@CreateTrainerMandatoryFields
Scenario: Verify trainer is created successfully with only mandatory fields
    When the admin clicks the Add Trainer button
    And the admin fills only the mandatory trainer details
    And the admin clicks the Create Trainer button
    Then the trainer should be created successfully

@CreateTrainerConfirmPasswordRequired
Scenario: Verify trainer creation fails when Confirm Password is left blank
    When the admin clicks the Add Trainer button
    And the admin fills all trainer details except confirm password
    And the admin clicks the Create Trainer button
    Then the admin should see the message "Please confirm the password"

@CreateTrainerInvalidEmail
Scenario: Verify trainer creation fails with an invalid email address
    When the admin clicks the Add Trainer button
    And the admin fills all trainer details with an invalid email
    And the admin clicks the Create Trainer button
    Then the admin should see the message "enter a valid email address"

@CreateTrainerPasswordMismatch
Scenario: Verify trainer creation fails when Password and Confirm Password do not match
    When the admin clicks the Add Trainer button
    And the admin fills all trainer details with mismatched confirm password
    And the admin clicks the Create Trainer button
    Then the admin should see the message "Passwords do not match"