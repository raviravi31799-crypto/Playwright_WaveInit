@smoke
Feature: Framework Verification

  Scenario: Verify WaveInit Application Launch
    Given the user navigates to the application
    Then the page title should not be empty
