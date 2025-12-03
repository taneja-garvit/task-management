
## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash

$ npm run start:dev



## These are all the apis for testing

1. Authentication

Login
Method: POST
URL: /auth/login
Body (JSON):
{
  "username": "admin",
  "password": "password"
}


2. Teams

Create Team
Method: POST
URL: /teams
Body (JSON):
{
  "name": "Engineering"
}


Add Member to Team
Method: POST
URL: /teams/:id/members
Replace: :id with the actual Team ID (e.g., 656...).
Body (JSON):
{
  "username": "alice"
}


3. Tasks


Create Task
Method: POST
URL: /tasks
Body (JSON):
{
  "description": "Fix critical bug",
  "due_date": "2023-12-31"
}

Assign Task
Method: PUT
URL: /tasks/:id/assign
Replace: :id with the actual Task ID.
Body (JSON):
{
  "username": "alice"
}


Update Task Status
Method: PATCH
URL: /tasks/:id
Replace: :id with the actual Task ID.
Body (JSON):
{
  "status": "IN_PROGRESS"
}


List Tasks
Method: GET
URL: /tasks
Optional Query Param: /tasks?assignee=alice