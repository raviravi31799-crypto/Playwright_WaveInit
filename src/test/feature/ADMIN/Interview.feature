@interview
Feature: Schedule an interview -Jothika-27-08-2026

Background:
Given the admin user is logged in
And the admin is on the Interviews page

Scenario Outline: Schedule an interview with valid details
When the admin clicks on the Schedule Interview button
And the admin enters all required interview details "<interviewTitle>" "<interviewDate>" "<interviewTime>" "<meetingType>" "<interviewType>" "<duration>" "<notes>"
And the admin schedules the interview
Then the interview should be displayed in the scheduled interviews list


Examples:
      | interviewTitle                       | interviewDate | interviewTime | meetingType                         | interviewType | duration   | notes                                     |
      | Senior Developer Technical Interview | 28-08-2026    | 10:00AM       | In-Platform (Interview in this app) | Technical     | 60 minutes | Technical round interview                 |
      | Initial HR Interview                 | 29-08-2026    | 11:00AM       | In-Platform (Interview in this app) | HR            | 30 minutes | Initial HR discussion                     |
      | Project Manager Interview            | 30-08-2026    | 02:00PM       | In-Platform (Interview in this app) | Managerial    | 60 minutes | Managerial discussion                     |
      | Custom Interview                     | 31-08-2026    | 03:00PM       | In-Platform (Interview in this app) | Custom        | 30 minutes | Custom interview scheduled through test   |