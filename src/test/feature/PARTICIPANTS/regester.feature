@register @sriram
Feature: Verify register functionality in WaveInit

    Background:
        Given the user navigates to the application
        When the user clicks on learner in the login menu

    @positive
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

    @negative @duplicate_email
    Scenario Outline: Verify error message when registering with an existing email
        When the user clicks on sign up as a participant
        And the user enters existing "<first name>", "<last name>", "<email>", "<number>", "<password>", and "<confirm password>"
        And the user accepts the terms and conditions
        And the user submits the registration form
        Then the user should see an error message "<error message>"

        Examples:
            | first name | last name | email                 | number     | password   | confirm password | error message                             |
            | Sriram     | Titoo     | titooram123@gmail.com | 6381102874 | sriram123@ | sriram123@       | An account with this email already exists |

    @negative @password_mismatch
    Scenario Outline: Verify error message when password and confirm password do not match
        When the user clicks on sign up as a participant
        And the user enters mismatch password details "<first name>", "<last name>", "<email>", "<number>", "<password>", and "<confirm password>"
        And the user accepts the terms and conditions
        And the user submits the registration form
        Then the user should see a password mismatch error message "<error message>"

        Examples:
            | first name | last name | email                | number     | password    | confirm password | error message           |
            | srim       | titoo     | titoom123@gmail.com  | 9876543210 | password123 | pass12           | Passwords do not match  |

    @negative @terms_unchecked
    Scenario Outline: Verify error message when terms and conditions are not accepted
        When the user clicks on sign up as a participant
        And the user enters unaccepted terms details "<first name>", "<last name>", "<email>", "<number>", "<password>", and "<confirm password>"
        And the user does not accept the terms and conditions
        And the user submits the registration form
        Then the user should see a terms error message "<error message>"

        Examples:
            | first name | last name | email             | number     | password    | confirm password | error message                 |
            | Sriram     | Titoo     | tit23@gmail.com   | 6381102874 | sriram123@  | sriram123@       | You must agree to the terms   |