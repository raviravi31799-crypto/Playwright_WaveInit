@trainerCourses @jagadeep
Feature: Verify Trainer course search and sorting functionality in WaveInit

    Background:
        Given the user navigates to the application
        When the user clicks on trainer in the login menu
        And the trainer logs in with valid credentials

    @courseSearch
    Scenario Outline: Verify trainer course search functionality
        When the trainer enters course name "<courseName>" in the search bar
        Then the course search result should contain "<courseName>" for "<expectedResult>" search

        Examples:
            | courseName       | expectedResult |
            | Machine learning         | valid          |
            | InvalidCourse | invalid        |

    @sortNewest
    Scenario: Verify trainer can sort courses by newest
        When the trainer selects "Newest" from the sort dropdown
        Then the courses should be displayed from newest to oldest

    @sortOldest
    Scenario: Verify trainer can sort courses by oldest
        When the trainer selects "Oldest" from the sort dropdown
        Then the courses should be displayed from oldest to newest