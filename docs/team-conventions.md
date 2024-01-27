# TEAM BRANCH, COMMIT, AND PULL REQUEST CONVENTIONS
---
## BRANCHES

### TWO BRANCHS TO MAKE PULL REQUESTS TO FOR PUSHING YOUR CHANGES ARE:
#### Main branch 
  The default production branch that needs to be stable at all times.
  You can merge changes into the master branch only after code review and testing. 
  All collaborators on a project must keep the master branch stable and updated.

#### Develop branch 
  The main development branch to test and make sure,
    -  new features work 
    -  get bug fixes worked through 
    -  other changes,  
  
  Its main reason is to be the place for making changes instead of just pushing them right into the main branch.


### BRANCHES NEED TO BE NAMED BASED ON PURPOSE, SEE BELOW:
#### Bugfix branch
  A bug that needs fixed ASAP or the feature can't be used.

    Start with:
  - bugfix/
 
#### Hotfix branch
  Temporary solution for a bug so things can keep moving.
  Might not be the best solution or even the solution, but it works for now and should be returned back to if nessesary in the future. 
  This can be pushed directly into develop branch to get the issue fixed ASAP.

    Start with:
  - hotfix/

#### Feature branch
  Add, edit, or remove a feature. 
  Created from the develop branch.
  After the changes are made, merge back into the develop branch.

    Start with:
  - feature/

#### Experimental branch**.
  When you want to experiment with new features or ideas not related to a current task.
  It is a branch for trying out new things.

    Start with:
  - experiment/ 

#### WIP branch**
  A WIP (work in progress) for developing or trying out new features. 
  Basically, if you're creating a branch it isnt fixing a bug, adding or changing a feature, or experimenting, use this.

    Start with:
  - WIP/ 

#### Merging branch**
  Temporary branch used for resolving merge conflicts.

    Start with:
  - merge/


### HOW TO NAME BRANCHES
  - lowercase
  - separate words with slashes(/) and hyphens (-)

#### EXAMPLE OF A GOOD BRANCH NAME:
    BAD
////////////////////////////////

featurenewuserregistrationworkflowwithemailverification

////////////////////////////////

    GOOD
////////////////////////////////

feature/new-user-registration-workflow-with-email-verification

////////////////////////////////

This branch name is descriptive and provides information about the branch's purpose.
BUT, shorten the branch name whenever possible. 

To make even better, shorten. 

    EVEN BETTER
////////////////////////////////

feature/email-verification-workflow

////////////////////////////////

---

## COMMIT NAMING
### COMMITS MUST FOLLOW THIS SYNTAX:
////////////////////////////////

<type>(<scope>): <description>

////////////////////////////////

#### <type>
    Needs to be one of these:
- `feat` adds, edits or removes a feature
- `fix` a bug fix
- `chore` miscellaneous commits *(like updating the .gitignore file)*
- `docs` only affect documentation
- `refactor` when you're changing the structure or organization of the code without affecting functionality (like restructuring files)
- `style` code that is related to styling (white-space, formatting, missing semi-colons, etc)
- `test` related to testing
- `ops` dev ops (for later when deployment is started)


#### (<scope>) (optional)
- to be more specific


### <description>
- present tense 
  - (use "add" instead of "added" or "adds")
  - easier to read and scan quickly
- no periods at the end
- don't capitalize the first letter

#### EXAMPLES OF NAMING COMMITS:
////////////////////////////////

feat(api): send an email to the customer when account created successfully

////////////////////////////////


////////////////////////////////

docs: correct spelling of CHANGELOG

////////////////////////////////

---

## PULL REQUEST NAMING
### PULL REQUESTS MUST FOLLOW THIS SYNTAX:
////////////////////////////////

<title>

<description>

////////////////////////////////

#### <title>
Short, informative summary
- dont end with period


#### <description>
More detailed explanation for when someone reviews the pull request

- Explain what, why, etc.
- Keep it maxiumum around 70 characters or so
- Every paragraph capitalized


#### EXAMPLE PULL REQUEST (TITLE & DESCRIPTION):
(it doesn't have to be this long, this was just one with a lot of setup)
////////////////////////////////////////////////////////////////

(Title)
Setup Express server and establish MVC architecture

(Description)
This pull request introduces the foundational setup for our Express server 
and establishes the MVC (Model-View-Controller) architecture for our application. 

Key changes include:

- Initialization of the Express server in server.js
- Serving static files from the newly created public directory
- Creation of the models directory with schemas for users, budgets, goals, and dashboards
- Addition of a controllers directory with a user controller to handle business logic
- Setup of user routes in the routes directory for managing user-related requests
- Configuration of the database connection in the config directory

This setup lays the groundwork for our application's backend and enables us 
to start building out the API and connecting it with a frontend.

////////////////////////////////////////////////////////////////