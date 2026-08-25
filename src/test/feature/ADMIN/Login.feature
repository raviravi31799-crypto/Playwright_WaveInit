@Jothika
Feature: Login functionality of Admin- Jothika-25/08/2026

Background:
Given the user launched the application and chooses admin Login

Scenario: Verify the valid admin login functionality of the application
When the user  enters the valid email and password
And clicks on signin as admin
Then the user is directed to the dashboard page showing welcome message


Scenario Outline: Verify the invalid admin login functionality with different invalid datas
When the user enters "<email>" and "<password>"
And clicks on signin as admin
Then the user receives an "<errormessage>"

Examples:
|email            |password   |errormessage             |
|admin@gmail.com  |admin123   |Invalid email or password |
|admin@test.com   |admin      |Invalid email or password |
|admin@gmail.com  |admin      |Invalid email or password |


Scenario Outline: Verify admin login with blank mandatory fields
When the user fills "<email>" and "<password>"
And clicks on signin as admin
Then the user should receive an "<alertmessage>"

Examples:
|email           |passsword   |alertmessage               |
|                |admin123    |Please fill out this field. |
|admin@test.com  |            |Please fill out this field. |
|                |            |Please fill out this field. |
