@participantLogin @sriram
Feature: Verify Participant login functionality in WaveInit

    Background:
        Given the user navigates to the application
        When the user clicks on learner in the login menu

    @positive
    Scenario Outline: Verify valid participant login functionality
        When the user enters participant "<email>" and "<password>"
        And the user clicks on sign in as learner
        Then the user should see the welcome message "<welcome_message>" in the dashboard

        Examples:
            | email                 | password   | welcome_message |
            | titooram123@gmail.com | Sriram123@ | Welcome back    |

    @negative @invalid_credentials
    Scenario: Verify participant login with invalid credentials using json
        When the user enters invalid participant credentials from json
        And the user clicks on sign in as learner
        Then the user should see the login error message "Invalid email or password"

    @negative @empty_fields
    Scenario Outline: Verify participant login mandatory field validation for empty fields
        When the user enters participant "<email>" and "<password>"
        And the user clicks on sign in as learner
        Then the user should see the required field validation tooltip containing "<validation_message>"

        Examples:
            | email                 | password   | validation_message           |
            |                       |            | Please fill out this field.  |
            |                       | Sriram123@ | Please fill out this field.  |
            | titooram123@gmail.com |            | Please fill out this field.  |
            | invalid_user          |            | Please fill out this field.  |

    @forgot_password
    Scenario Outline: Verify participant forgot password navigation and header
        When the user clicks on forgot password link
        Then the user should see the forgot password header "<header_title>"

        Examples:
            | header_title    |
            | Forgot Password? |
