## Description
What does the PR do?

creates Route table and its associations 

## Background Information
Any background information/context for the changes in the PR? (don't just copy the description in the Jira ticket)

We decided have Route table and route location join table , instead of having that fields in group. this pr is creating route table and rout_location join table 

## Screenshots

<details><summary> ## Reviewer checklist</summary>
  <ul>
    <li> - [x] Screenshots attached (if dealing with UI)</li>
    <li> - [x] Unit Tests (if applicable)</li>
    <li> - [x] Make sure all CI Tests are passing</li>
    <li> - [x] Removed extraneous `byebug`s </li>
  </ul>
</details>

## Testing Steps for reviewer:
- Step 1 pull the  branch 
- Step 2 in console create new route and locations and make relation between them
- Stap 3 see everything works as expected

## How does this PR make you feel?
Select a gif (maybe from https://giphy.com/categories/emotions?) and embed it below, using `![](GIPHYURL)`
![](https://media.giphy.com/media/R1H6UPWFGtURK1ZwgJ/giphy.gif)
