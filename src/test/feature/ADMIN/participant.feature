```gherkin
@Subha
Feature: Create Participant Account in Admin Module - Subhashree-26/08/2026

Background:
    Given the admin navigates to the Participants page


@AddParticipant
Scenario Outline: Verify participant is added successfully with valid details
    When the admin clicks the Add Participant button
    And the admin fills the participant details with name "<fullName>" email "<email>" phone "<phone>" status "<status>" and password "<password>"
    And the admin submits the participant form
    Then the participant should be added successfully

    Examples:
        | fullName | email            | phone      | status            | password |
        | Rachel   | rachel@x.com     | 9876543210 | Approved (Active) | Pass@123 |
        | Riya     | riya@x.com       | 9876543211 | Pending Approval  | Pass@123 |
        | Raja     | raja@x.com       | 9176546711 | Pending Approval  | Pass@123 |


@CancelParticipant
Scenario Outline: Verify Add Participant form closes when Cancel is clicked
    When the admin clicks the Add Participant button
    And the admin fills the participant details with name "<fullName>" email "<email>" phone "<phone>" status "<status>" and password "<password>"
    And the admin clicks the Cancel button
    Then the Add Participant form should be closed

    Examples:
        | fullName | email          | phone      | status            | password |
        | David    | david@x.com    | 9876543212 | Approved (Active) | Pass@123 |


@ApproveParticipant
Scenario Outline: Verify admin can approve a pending participant
    When the admin clicks the Add Participant button
    And the admin fills the participant details with name "<fullName>" email "<email>" phone "<phone>" status "<status>" and password "<password>"
    And the admin submits the participant form
    Then the participant should be added successfully
    When the admin searches for the participant
    And the admin approves the participant
    Then the participant should be approved successfully

    Examples:
        | fullName | email          | phone      | status           | password |
        | Michael  | michael@x.com  | 9876543213 | Pending Approval | Pass@123 |


@RejectParticipant
Scenario Outline: Verify admin can reject a pending participant
    When the admin clicks the Add Participant button
    And the admin fills the participant details with name "<fullName>" email "<email>" phone "<phone>" status "<status>" and password "<password>"
    And the admin submits the participant form
    Then the participant should be added successfully
    When the admin searches for the participant
    And the admin rejects the participant
    Then the participant should be rejected successfully

    Examples:
        | fullName | email          | phone      | status           | password |
        | Emma     | emma@x.com     | 9876543214 | Pending Approval | Pass@123 |


@DeleteParticipant
Scenario Outline: Verify admin can delete a participant
    When the admin clicks the Add Participant button
    And the admin fills the participant details with name "<fullName>" email "<email>" phone "<phone>" status "<status>" and password "<password>"
    And the admin submits the participant form
    Then the participant should be added successfully
    When the admin searches for the participant
    And the admin deletes the participant
    And the admin confirms the deletion
    Then the participant should be deleted successfully

    Examples:
        | fullName | email          | phone      | status           | password |
        | Daniel   | daniel@x.com   | 9876543215 | Pending Approval | Pass@123 |


@SearchParticipant
Scenario Outline: Verify admin can search participant by name
    When the admin searches for the participant "<fullName>"
    Then the searched participant "<fullName>" should be displayed

    Examples:
        | fullName |
        | Rachel   |
        | Michael  |


@SearchParticipantByEmail
Scenario Outline: Verify admin can search participant by email
    When the admin searches for the participant "<email>"
    Then the participant with email "<email>" should be displayed

    Examples:
        | email        |
        | rachel@x.com |
        | daniel@x.com |


@SearchInvalidParticipant
Scenario: Verify no participant is displayed for an invalid search
    When the admin searches for the participant "NonExistingParticipant"
    Then no matching participant should be displayed


@FilterApproved
Scenario Outline: Verify admin can filter participants by Approved status
    When the admin clicks the Add Participant button
    And the admin fills the participant details with name "<fullName>" email "<email>" phone "<phone>" status "<status>" and password "<password>"
    And the admin submits the participant form
    Then the participant should be added successfully
    When the admin clicks the Approved filter
    Then only approved participants should be displayed

    Examples:
        | fullName | email          | phone      | status            | password |
        | Olivia   | olivia@x.com   | 9876543216 | Approved (Active) | Pass@123 |


@FilterPending
Scenario Outline: Verify admin can filter participants by Pending status
    When the admin clicks the Add Participant button
    And the admin fills the participant details with name "<fullName>" email "<email>" phone "<phone>" status "<status>" and password "<password>"
    And the admin submits the participant form
    Then the participant should be added successfully
    When the admin clicks the Pending filter
    Then only pending participants should be displayed

    Examples:
        | fullName | email          | phone      | status           | password |
        | Sophia   | sophia@x.com   | 9876543217 | Pending Approval | Pass@123 |


@FilterRejected
Scenario Outline: Verify admin can filter participants by Rejected status
    When the admin clicks the Add Participant button
    And the admin fills the participant details with name "<fullName>" email "<email>" phone "<phone>" status "<status>" and password "<password>"
    And the admin submits the participant form
    Then the participant should be added successfully
    When the admin searches for the participant
    And the admin rejects the participant
    Then the participant should be rejected successfully
    When the admin clicks the Rejected filter
    Then only rejected participants should be displayed

    Examples:
        | fullName | email          | phone      | status           | password |
        | James    | james@x.com    | 9876543218 | Pending Approval | Pass@123 |
```
