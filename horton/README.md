# Horton API --- Back-end Server

<p align="center"><img src="https://raw.githubusercontent.com/johnshields/Repota-App/main/horton/favicon.ico"
alt="Horton Logo" width="200" height="200"/>
</p>

Horton is the back-end to [www.repota-service.com](https://www.repota-service.com)

To see how Horton was designed go [here](https://johnshields.github.io/horton.api.doc).

### Run Horton

Ensure you have done the following:

* Create the [Database](https://github.com/johnshields/Repota-App/blob/main/database/REPOTA_DB.sql) in a MySQL Console.
* Edit the [config.ini](https://github.com/johnshields/Repota-App/blob/main/horton/go/config/config.ini) file with your MySQL details.
* Get an App ID and API key from [Back4App](https://www.back4app.com/database/back4app/car-make-model-dataset) to use their service. (First 10k requests are free).
* Add in your App ID and API key into the `.txt` [config files](https://github.com/johnshields/Repota-App/tree/main/horton/go/config).

To run the Horton, enter these commands in to the CLI:

```
$ go mod download
$ go build && go run main.go
```
***

# RESTful Routes
```
All routes and CORS are handled by routers.go
```

Function | HTTP request | Description
------------- | ------------- | -------------
**Index** | **GET** /api/v1/ | Index
**Register** | **POST** /api/v1/register | User Registration
**Login** | **POST** /api/v1/login | User Login
**Logout** | **GET** /api/v1/logout | User Logout
**CreateReport** | **POST** /api/v1/jobReports | Create a Report
**DeleteReport** | **DELETE** /api/v1/jobReports/:jobReportId | Delete a Report
**GetReportById** | **GET** /api/v1/jobReports/:jobReportId | Get a Report
**GetReports** | **GET** /api/v1/jobReports | Get all Reports
**UpdateReport** | **PUT** /api/v1/jobReports/:jobReportId| Update a Report
**GetCarApiData** | **GET** /api/v1/carApiData | Get data from [Back4App](https://www.back4app.com/database/back4app/car-make-model-dataset)


# Database
Horton is the connection between Repota and its MySQL database.

`db_connection.go` connects Horton to the database.

The database consists of four tables.

* workers
    - Resembles a Users table
* session
    - For User login sessions
* jobreports
    - Report information
* customers
    - Customer information

![database](https://github.com/johnshields/Repota-App/blob/main/database/repotadb_UML.png?raw=true)

Everything is attached to the Workers (Users).

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
