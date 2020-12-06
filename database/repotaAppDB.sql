-- REPOTA DATABASE --
-- repotadb --
-- JOHN SHIELDS --

-- create repotadb --
DROP DATABASE IF EXISTS repotadb;
CREATE DATABASE repotadb DEFAULT CHARACTER SET = utf8 DEFAULT COLLATE = utf8_general_ci;
use repotadb;

-- workers table --
CREATE TABLE IF NOT EXISTS workers
(
    worker_id   int(5)       unsigned NOT NULL AUTO_INCREMENT,
    worker_name varchar(50)  NOT NULL,
    hash        varchar(255) NOT NULL,
    PRIMARY KEY (worker_id),
    UNIQUE KEY (worker_name)
) ENGINE = InnoDB
  AUTO_INCREMENT = 6;
-- workers table --
INSERT INTO workers (worker_id, worker_name, hash)
VALUES (141, 'John Shields', '0012108F09466ED8B9CC712BC546D02A'),
       (174, 'Steve Maloney', '8743b52063cd84097a65d1633f5c74f5');
COMMIT;

-- jobWork table --
CREATE TABLE IF NOT EXISTS workDone
(
    work_id    int(6)       unsigned NOT NULL AUTO_INCREMENT,
    worker_id  int(5)       unsigned NOT NULL,
    cause      varchar(500) NOT NULL,
    correction varchar(500) NOT NULL,
    parts      varchar(500) NOT NULL,
    work_hours int(10)      NOT NULL,
    PRIMARY KEY (work_id),
    FOREIGN KEY (worker_id) REFERENCES workers (worker_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 6;
-- jobWork table --
INSERT INTO workDone (work_id, worker_id, cause, correction, parts, work_hours)
VALUES (113, 141, 'The lock on the passenger door was broken.', 'A new lock has been fitted.', '1 DOOR LOCK', '1'),
       (245, 141, 'The left back wheel bearing was worn.', 'Fitted a new wheel bearing.', '1 WHEEL BEARING', '2'),
       (321, 174, 'The radio connections were disconnected.', 'The radio connections have been reconnected.', 'NONE', '1'),
       (416, 141, 'Worn out tires.', 'New tires have been fitted.', '4 TIRES', '1'),
       (502, 141, 'Service on vehicle was due.', 'Serviced vehicle.', '1 OIL FILTER', '2'),
       (606, 141, 'Cables were eroded.', 'Entire system has been replaced.', '2 CABLES, 2 BRAKE PADS', '3');
COMMIT;

-- jobReports table --
CREATE TABLE IF NOT EXISTS jobReports
(
    job_report_id    int(6)       unsigned NOT NULL AUTO_INCREMENT,
    worker_id        int(5)       unsigned NOT NULL,
    work_done_id     int(6)       unsigned NOT NULL,
    time_date_stamp  varchar(20)  NOT NULL,
    vehicle_model    varchar(60)  NOT NULL,
    vehicle_reg      varchar(60)  NOT NULL,
    vehicle_location varchar(500) NOT NULL,
    miles_on_vehicle int(20)      NOT NULL,
    warranty         varchar(5)   NOT NULL,
    breakdown        varchar(5)   NOT NULL,
    PRIMARY KEY (job_report_id),
    FOREIGN KEY (worker_id) REFERENCES workers (worker_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (work_done_id) REFERENCES workDone (work_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 6;
-- jobReports table --
INSERT INTO jobReports (job_report_id, worker_id, work_done_id, time_date_stamp, vehicle_model, vehicle_reg,
                        vehicle_location,
                        miles_on_vehicle, warranty, breakdown)
VALUES (121, 141, 113, '03/04/2020', 'Ford Focus', '151-DL-2308', 'Gort, Co. Galway', '508538', 'YES', 'NO'),
       (251, 141, 245, '06/04/2020', 'Toyota Yaris', '08-KY-667', 'Laban, Co. Galway', '648598', 'YES', 'NO'),
       (342, 174, 321, '07/04/2020', 'Hyundai i30', '163-TS-1459', 'Barefield, Co. Clare', '700891', 'YES', 'NO'),
       (456, 141, 416, '08/04/2020', 'Ford Mustang', '54-SF-135', 'Furbogh, Co. Galway', '1007538', 'YES', 'NO'),
       (543, 141, 502, '12/04/2020', 'Volkswagen Passat', '07-DL-298', 'Westside, Co. Galway', '708538', 'YES', 'NO'),
       (651, 141, 606, '14/04/2020', 'Honda Civic', '131-DL-298', 'Ballybane, Co. Galway', '318639', 'YES', 'YES');

COMMIT;

-- customers table --
CREATE TABLE IF NOT EXISTS customers
(
    customer_id        int(6)       unsigned NOT NULL AUTO_INCREMENT,
    job_report_id      int(6)       unsigned NOT NULL,
    customer_name      varchar(50)  NOT NULL,
    customer_complaint varchar(500) NOT NULL,
    PRIMARY KEY (customer_id),
    FOREIGN KEY (job_report_id) REFERENCES jobReports (job_report_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 6;

-- customers table --
INSERT INTO customers (job_report_id, customer_name, customer_complaint)
VALUES (121, 'Freddie Quell', 'The passenger side door will not open.'),
       (251, 'Peggy Dod', 'The left back wheel is shaking.'),
       (342, 'Lucy O`Neill', 'The radio is not turning on.'),
       (456, 'Humphrey Bogart', 'The car needs new tires.'),
       (543, 'Daniel Plainview', 'The car is due a service.'),
       (651, 'Mick Fanning', 'The hand brake is stuck.');
COMMIT;

-- USEFUL QUERIES --
-- SELECT ALL TABLES' DATA --
SELECT * FROM jobreports; SELECT * FROM customers; SELECT * FROM workdone; SELECT * FROM workers;

-- QUERY FOR REPORT HISTORY PAGE --
-- SELECT ALL THE REPORTS DONE BY A SPECIFIC WORKER --
SELECT DISTINCT jr.job_report_id, jr.time_date_stamp, jr.vehicle_model, jr.vehicle_reg, jr.miles_on_vehicle,
       jr.vehicle_location, jr.warranty, jr.breakdown, cust.customer_name, cust.customer_complaint,
       wd.cause, wd.correction, wd.parts, wd.work_hours, wkr.worker_name
    FROM jobreports jr
    INNER JOIN workdone wd
        ON jr.work_done_id = wd.work_id
    INNER JOIN customers cust
        ON jr.job_report_id = cust.job_report_id
    INNER JOIN workers wkr on jr.worker_id = wkr.worker_id WHERE wkr.worker_id = 141;

-- BUTTONS FOR SPECIFIC REPORTS --
SELECT DISTINCT jr.job_report_id AS "Report Number", jr.time_date_stamp AS "Time/Date", cust.customer_name AS "Customer Name"
    FROM jobreports jr
    INNER JOIN workdone wd
        ON jr.work_done_id = wd.work_id
    INNER JOIN customers cust
        ON jr.job_report_id = cust.job_report_id
    INNER JOIN workers wkr on jr.worker_id = wkr.worker_id WHERE wkr.worker_id = 141;

-- QUERY FOR REPORT DISPLAY PAGE -- THE REPORT THE WORKER HAS CHOSEN --
-- SELECT A FULL REPORT DONE BY WORKER 1 (REPORT 456 - 29/11/2020) --
SELECT DISTINCT jr.job_report_id, jr.time_date_stamp, jr.vehicle_model, jr.vehicle_reg, jr.miles_on_vehicle,
       jr.vehicle_location, jr.warranty, jr.breakdown, cust.customer_name, cust.customer_complaint,
       wd.cause, wd.correction, wd.parts, wd.work_hours, wkr.worker_name
    FROM jobreports jr
    INNER JOIN workdone wd
        ON jr.work_done_id = wd.work_id
    INNER JOIN customers cust
        ON jr.job_report_id = cust.job_report_id
    INNER JOIN workers wkr on jr.worker_id = wkr.worker_id WHERE jr.job_report_id = ? AND jr.time_date_stamp = ? AND customer_name = ?;

SELECT DISTINCT jr.job_report_id, jr.time_date_stamp, jr.vehicle_model, jr.vehicle_reg, jr.miles_on_vehicle,
       jr.vehicle_location, jr.warranty, jr.breakdown, cust.customer_name, cust.customer_complaint,
       wd.cause, wd.correction, wd.parts, wd.work_hours, wkr.worker_name
    FROM jobreports jr
    INNER JOIN workdone wd
        ON jr.work_done_id = wd.work_id
    INNER JOIN customers cust
        ON jr.job_report_id = cust.job_report_id
    INNER JOIN workers wkr on jr.worker_id = wkr.worker_id WHERE jr.job_report_id = ?;

SELECT DISTINCT jr.job_report_id, jr.time_date_stamp, jr.vehicle_model, jr.vehicle_reg, jr.miles_on_vehicle,
       jr.vehicle_location, jr.warranty, jr.breakdown, cust.customer_name, cust.customer_complaint,
       wd.cause, wd.correction, wd.parts, wd.work_hours, wkr.worker_name
    FROM jobreports jr
    INNER JOIN workdone wd
        ON jr.work_done_id = wd.work_id
    INNER JOIN customers cust
        ON jr.job_report_id = cust.job_report_id
    INNER JOIN workers wkr on jr.worker_id = wkr.worker_id WHERE customer_name = ?;

SELECT DISTINCT jr.job_report_id, jr.time_date_stamp, jr.vehicle_model, jr.vehicle_reg, jr.miles_on_vehicle,
       jr.vehicle_location, jr.warranty, jr.breakdown, cust.customer_name, cust.customer_complaint,
       wd.cause, wd.correction, wd.parts, wd.work_hours, wkr.worker_name
    FROM jobreports jr
    INNER JOIN workdone wd
        ON jr.work_done_id = wd.work_id
    INNER JOIN customers cust
        ON jr.job_report_id = cust.job_report_id
    INNER JOIN workers wkr on jr.worker_id = wkr.worker_id WHERE jr.time_date_stamp = ?;

