# Horton Backend Server

<p align="center"><img src="https://raw.githubusercontent.com/johnshields/Repota-App/main/horton/favicon.ico"
alt="Horton Logo" width="200" height="200"/>
</p>

Horton is the back-end to [www.repota-service.com](https://www.repota-service.com)

For more information on how Horton works, go [here](https://github.com/johnshields/Repota-App/blob/main/horton/go/README.md).

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

###### END OF README