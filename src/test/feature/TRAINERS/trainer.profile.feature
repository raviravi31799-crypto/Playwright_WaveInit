@trainerProfile @jagadeep
Feature: Verify Trainer profile skill functionality in WaveInit

    Background:
        Given the user navigates to the application
        When the user clicks on trainer in the login menu
        And the trainer logs in with valid credentials for profile
        And the trainer opens My Profile

    @addSkill
    Scenario Outline: Verify trainer can add skill in profile
        When the trainer clicks on Add Skill
        And the trainer enters skill "<skill>"
        And the trainer clicks on Add Skill button
        Then the skill "<skill>" should be displayed in the trainer profile for "<expectedResult>" result

        Examples:
            | skill        | expectedResult |
            | Playwright   | valid          |
            | Selenium     | valid          |