## Description
What does the PR do?

creates Route table and its associations 

## Background Information
Any background information/context for the changes in the PR? (don't just copy the description in the Jira ticket)

We decided have Route table and route location join table , instead of having that fields in group. this pr is creating route table and rout_location join table 

## Screenshots
![Screenshot from 2021-08-17 15-44-53](https://user-images.githubusercontent.com/27401425/129810778-bd4487e2-cbd8-41fd-bde0-842eb7dce5b7.png)
![Screenshot from 2021-08-17 15-44-46](https://user-images.githubusercontent.com/27401425/129810780-cf0056a2-9340-4072-85d3-291204b8a944.png)

## Checklist:
- [x] Screenshots attached (if dealing with UI)
- [x] Unit Tests (if applicable)
- [x] Make sure all CI Tests are passing
- [x] Removed extraneous `byebug`s

## Testing Steps for reviewer:
- Step 1 pull the  branch 
- Step 2 in console create new route and locations and make relation between them
- Stap 3 see everything works as expected

## How does this PR make you feel?
Select a gif (maybe from https://giphy.com/categories/emotions?) and embed it below, using `![](GIPHYURL)`
![](https://media.giphy.com/media/R1H6UPWFGtURK1ZwgJ/giphy.gif)
