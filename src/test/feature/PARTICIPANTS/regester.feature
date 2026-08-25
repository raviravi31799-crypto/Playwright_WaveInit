@register @sriram
Feature: Verify register functionality in WaveInit

    Background:
        Given the user navigates to the application
        When the user clicks on learner in the login menu

    Scenario Outline: Verify participant registration functionality in WaveInit
        When the user clicks on sign up as a participant
        And the user enters valid "<first name>", "<last name>", "<email>", "<number>", "<password>", and "<confirm password>"
        And the user accepts the terms and conditions
        And the user submits the registration form
        Then the user should be registered successfully

        Examples:
            | first name | last name | email           | number     | password | confirm password |
            | Demo       | Demo      | demo@gmail.com  | 1234567890 | demo123  | demo123          |
            | Demo2      | Demo2     | demo2@gmail.com | 1234567891 | demo123  | demo123          |