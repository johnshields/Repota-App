# Horton Back-end Server

<p align="center"><img src="https://raw.githubusercontent.com/johnshields/Repota-App/main/horton/favicon.ico"
alt="Horton Logo" width="200" height="200"/>
</p>

Horton is the back-end to [www.repota-service.com](https://www.repota-service.com)

# RESTful Routes
```
All routes and CORS are handled by routers.go
```

* Index = /api/v1/
* Login = /api/v1/login
* Register = /api/v1/register
* Logout = /api/v1/logout
* GetReports = /api/v1/jobReports
* GetReportById = /api/v1/jobReports/:jobReportId
* CreateReport = /api/v1/jobReports
* UpdateReport = /api/v1/jobReports/:jobReportId
* DeleteReport = /api/v1/jobReports/:jobReportId
* GetCarApiData = /api/v1/carApiData

# Database
Horton is the connection between Repota and its MySQL database.

`db_connection.go` connects Horton to the database.

The database consists of four tables.

* workers 
    - basically a Users table 
* session
    - For user login sessions
* jobreports
    - Report information
* customers
    - Customer information

![database](https://github.com/johnshields/Repota-App/blob/main/database/repotadb_UML.png?raw=true)

Everything is attached to the workers (Users).

***

# Users
```
User Registration, Login, Sessions and Logout all handled with api_account.go, mode_inline_oject.go, model_worker_account.go, model_session.go and session.go
```

## Registration
Users get registered by a username, name and a password. Checks are made to ensure a username or name does not exist in the database.
The password is hashed using `golang.org/x/crypto/bcrypt`.

A user is registered by a MySQL INSERT QUERY that inserts the details in to the `workers` table.

A session is generated using a UUID (Universally Unique ID) and stored in the `session` table.

## Login
Users are logged in by their username and password. The entered password is compared to the hashed one in the database. 
If the details are correct and if they have a current session it is removed and replaced by a new one.

A `Cookie` of three days is set for the user, and then are logged in.

## Logout
Users are logged out by removing their current session and replacing it with one that expires in one 
second. A cookie is set with this new session, and they are logged out after it expires.

***

# Reports
```
All Report CRUD operations are handled by api_job_report.go, model_job_report.go and model_worker_account.go
```

## Get Reports
Reports are obtained by checking if the user has a cookie and if they own these reports.

If this fills out a MySQL JOIN QUERY is then used to get all the user's reports in `jobreports`.

## Get Report by ID
A Report is obtained by checking if the user has a cookie and if they own the report.

If this fills out a MySQL JOIN QUERY is then used to get the specific report.

## Create a Report
A Report is created by checking if the user has a cookie, 
if they do a MySQL transition is started with the details they entered. 
This transition inserts the details in the tables jobreports and customers.

## Update a Report
A Report is updated by checking if the user has a cookie,
if they do a MySQL UPDATE QUERY is done with the details they entered.

## Delete a Report
A Report is deleted by checking if the user has a cookie,
if they do a MySQL DELETE QUERY is done to delete the report by its requested ID.

## Back4App
In `car_db_api.go` [Back4App](https://www.back4app.com/database/back4app/car-make-model-dataset) 
is used to load in 1000 Vehicle Makes and Models for users to create and update their reports with ease.

***
###### END OF README

