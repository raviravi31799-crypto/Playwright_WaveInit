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
            | titooram123@gmail.com | sriram123@ | Welcome back    |

    @negative @invalid_credentials
    Scenario: Verify participant login with invalid credentials using json
        When the user enters invalid participant credentials from json
        And the user clicks on sign in as learner
        Then the user should see the login error message "Invalid email or password"

    @negative @empty_fields_csv
    Scenario: Verify participant login mandatory field validation combinations using csv
        Then the user validates all participant login combinations from csv "testdata/participant_login_combinations.csv"
