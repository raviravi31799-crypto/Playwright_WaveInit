@myCoursesMenus @participant @sriram
Feature: Verify My Courses Menus and Tab Navigation in WaveInit Learner Portal

    Background:
        Given the user navigates to the application
        When the user clicks on learner in the login menu
        And the user enters participant "titooram123@gmail.com" and "Sriram123@"
        And the user clicks on sign in as learner
        Then the user should see the welcome message "Welcome back" in the dashboard
        When the user navigates to "My Courses" section and selects "React" course
        Then the user should see the course details page with title "React"

    @smoke @structure_menu
    Scenario: Verify Structure menu tab opens properly and displays course overview and curriculum details
        When the user clicks on "Structure" menu tab
        Then the user should see the "Structure" tab is active
        And the user should see the course curriculum banner "Course Curriculum & Materials"
        And the user should see the "Start Learning" button
        And the user should see the course overview and instructor details "sriram"

    @smoke @lessons_menu
    Scenario: Verify Lessons menu tab opens properly and displays lesson contents
        When the user clicks on "Lessons" menu tab
        Then the user should see the "Lessons" tab is active
        And the user should see the "Lessons" tab content loaded properly

    @smoke @quiz_menu
    Scenario: Verify AI Quiz menu tab opens properly and displays quiz assessment content
        When the user clicks on "AI Quiz" menu tab
        Then the user should see the "AI Quiz" tab is active
        And the user should see the "AI Quiz" tab content loaded properly

    @smoke @coding_menu
    Scenario: Verify Coding menu tab opens properly and displays coding challenges content
        When the user clicks on "Coding" menu tab
        Then the user should see the "Coding" tab is active
        And the user should see the "Coding" tab content loaded properly

    @smoke @discussions_menu
    Scenario: Verify Discussions menu tab opens properly and displays discussion forums
        When the user clicks on "Discussions" menu tab
        Then the user should see the "Discussions" tab is active
        And the user should see the "Discussions" tab content loaded properly

    @regression @all_menus
    Scenario Outline: Verify all course menu tabs open and become active upon click
        When the user clicks on "<menu_tab>" menu tab
        Then the user should see the "<menu_tab>" tab is active
        And the user should see the "<menu_tab>" tab content loaded properly

        Examples:
            | menu_tab     |
            | Structure    |
            | Lessons      |
            | AI Quiz      |
            | Coding       |
            | Discussions  |
            | Resources    |
            | Certificates |
            | Progress     |
