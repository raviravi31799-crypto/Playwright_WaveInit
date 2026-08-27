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
        | fullName    | email                | phone      | status             | password  |
        | RaviApproved| ravi.approved@x.com  | 9876543210 | Approved (Active)  | Pass@123  |
        | RaviPending | ravi.pending@x.com   | 9876543211 | Pending Approval   | Pass@123  |

@CancelParticipant
Scenario Outline: Verify Add Participant form closes when Cancel is clicked
    When the admin clicks the Add Participant button
    And the admin fills the participant details with name "<fullName>" email "<email>" phone "<phone>" status "<status>" and password "<password>"
    And the admin clicks the Cancel button
    Then the Add Participant form should be closed

    Examples:
        | fullName    | email             | phone      | status             | password  |
        | CancelTest  | cancel.test@x.com | 9876543212 | Approved (Active)  | Pass@123  |

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
        | fullName     | email                | phone      | status            | password  |
        | ApproveTest  | approve.test@x.com   | 9876543213 | Pending Approval  | Pass@123  |

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
        | fullName    | email               | phone      | status            | password  |
        | RejectTest  | reject.test@x.com   | 9876543214 | Pending Approval  | Pass@123  |

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
        | fullName    | email              | phone      | status            | password  |
        | DeleteTest  | delete.test@x.com  | 9876543215 | Pending Approval  | Pass@123  |
