Feature: Login functionality on Rahul Shetty Academy

Scenario: Successful login with valid credentials
  Given I open the login page
  When I submit login with username "rahulshettyacademy" and password "learning"
  Then I should see the dashboard
