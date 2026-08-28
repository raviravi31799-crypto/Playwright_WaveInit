@participantProfile @profile @sriram
Feature: Verify Participant Profile Details and Learning Analytics in WaveInit

    Background:
        Given the user navigates to the application
        When the user clicks on learner in the login menu
        And the user enters participant "titooram123@gmail.com" and "sriram123@"
        And the user clicks on sign in as learner
        Then the user should see the welcome message "Welcome back" in the dashboard
        When the user navigates to the participant profile page
        Then the user should see the profile page header "My Profile"

    @smoke @personal_info
    Scenario Outline: Verify participant personal information card details
        Then the user should see personal information with full name "<full_name>", email "<email>", phone "<phone>", participant ID "<participant_id>", department "<department>", designation "<designation>", and account status "<status>"

        Examples:
            | full_name | email                 | phone           | participant_id | department  | designation              | status |
            | sriram    | titooram123@gmail.com | +91 98765 43210 | PAR-1048       | Engineering | Senior Software Engineer | Active |

    @smoke @activity_summary
    Scenario Outline: Verify participant activity summary metrics
        Then the user should see the activity summary metrics with days active "<days_active>", courses accessed "<courses>", lessons completed "<lessons>", assessments taken "<assessments>", and time spent "<time_spent>"

        Examples:
            | days_active | courses | lessons | assessments | time_spent |
            | 5           | 31      | 1       | 4           | 6h 49m     |

    @regression @activity_heatmap
    Scenario: Verify learning activity heatmap display and timeframe options
        Then the user should see the learning activity heatmap section
        And the user should see the heatmap timeframe options:
            | Last 90 Days  |
            | Last 30 Days  |
            | Last 180 Days |
            | Last Year     |
        When the user selects "Last 30 Days" in the heatmap timeframe dropdown

    @regression @profile_completion
    Scenario: Verify profile completion score and JSON data consistency
        Then the user should see profile completion percentage "63%"
        And the user should see the personal information matching test data
        And the user should see the activity summary matching test data

    @regression @upload_photo
    Scenario: Verify participant profile photo upload using image from testdata
        When the user uploads profile photo "1T2A9487.jpg.jpeg" from testdata

