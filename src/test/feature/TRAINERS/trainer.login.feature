@trainerLogin @jagadeep
Feature: Verify Trainer login functionality in WaveInit

    Background:
        Given the user navigates to the application
        When the user clicks on trainer in the login menu

    Scenario Outline: Verify trainer login functionality
        When the user enters trainer "<username>" and "<password>"
        And the user clicks on sign in
        Then the trainer login result should be "<expected result>"

        Examples:
            | username               | password      | expected result |
            | rahul@gmail.com      | rahul1234    | success         |
            | wrongwavene20@gmail.com | sriram123@    | invalid         |
            | wavene20@gmail.com      | wrongsriram123@ | invalid         |
            |                        |               | required        |