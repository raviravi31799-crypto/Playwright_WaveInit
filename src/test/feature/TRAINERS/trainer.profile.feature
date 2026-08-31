@trainerProfile @jagadeep
Feature: Verify Trainer profile functionality in WaveInit

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
        Then the skill "<skill>" should be displayed in the trainer profile

        Examples:
            | skill      |
            | Playwright |
            | Selenium   |


    @addExperienceInvalid
    Scenario Outline: Verify trainer cannot add experience with missing mandatory fields
        When the trainer clicks on Add Experience
        And the trainer enters company name "<companyName>"
        And the trainer enters role "<role>"
        And the trainer enters start date "<startDate>"
        And the trainer clicks on Add Experience button
        Then the validation message should be displayed for "<missingField>"

        Examples:
            | companyName | role              | startDate  | missingField |
            |             | Software Engineer | 2022-06-01 | Company Name |
            | TCS         |                   | 2022-06-01 | Role         |
            | TCS         | Software Engineer |            | Start Date   |