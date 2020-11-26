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
    worker_id   int(5)       NOT NULL AUTO_INCREMENT,
    worker_name varchar(50)  NOT NULL,
    hash        varchar(255) NOT NULL,
    PRIMARY KEY (worker_id),
    UNIQUE KEY (worker_name)
) ENGINE = InnoDB
  AUTO_INCREMENT = 6;
-- workers table --
INSERT INTO workers (worker_id, worker_name, hash)
VALUES (1, 'John Shields', '8743b52063cd84097a65d1633f5c74f5'),
       (2, 'Paul Finn', '8743b52063cd84097a65d1633f5c74f5'),
       (3, 'Steve Maloney', '8743b52063cd84097a65d1633f5c74f5');
COMMIT;

-- jobWork table --
CREATE TABLE IF NOT EXISTS workDone
(
    work_id    int(6)       NOT NULL AUTO_INCREMENT,
    cause      varchar(500),
    correction varchar(500) NOT NULL,
    work_hours int(10)      NOT NULL,
    parts      varchar(500) NOT NULL,
    PRIMARY KEY (work_id)
) ENGINE = InnoDB
  AUTO_INCREMENT = 6;
-- jobWork table --
INSERT INTO workDone (work_id, cause, correction, work_hours, parts)
VALUES (1, 'The lock on the passenger door was broken', 'A new lock has been fitted', '1', 'Door Lock'),
       (2, 'The left back wheels bearing are worn', 'Fitted a new wheel bearing', '2', 'Wheel Bearing'),
       (3, 'The radio connections were disconnected', 'The radio connections have been reconnected', '1', 'NONE');
COMMIT;

-- jobReports table --
CREATE TABLE IF NOT EXISTS jobReports
(
    job_report_id    int(6)       NOT NULL AUTO_INCREMENT,
    worker_id        int(5)       NOT NULL,
    work_done_id     int(6)       NOT NULL,
    time_date_stamp  varchar(20),
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
VALUES (1, 1, 1, '21/11/2020', 'Ford Focus', '151-DL-2308', 'Gort, Co. Galway', '508538', 'YES', 'NO'),
       (2, 2, 2, '23/11/2020', 'Toyota Yaris', '08-KY-667', 'Laban , Co. Galway', '648598', 'YES', 'NO'),
       (3, 3, 3, '27/11/2020', 'Hyundai i30', '163-TS-1459', 'Barefield, Co. Clare', '700891', 'YES', 'NO');
COMMIT;

-- customers table --
CREATE TABLE IF NOT EXISTS customers
(
    customer_id        int(6)       NOT NULL AUTO_INCREMENT,
    job_report_id      int(6)       NOT NULL,
    customer_name      varchar(50)  NOT NULL,
    customer_complaint varchar(500) NOT NULL,
    PRIMARY KEY (customer_id),
    FOREIGN KEY (job_report_id) REFERENCES jobReports (job_report_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 6;

-- customers table --
INSERT INTO customers (customer_id, job_report_id, customer_name, customer_complaint)
VALUES (1, 1, 'Jack Brown', 'The passenger side door will not open'),
       (2, 2, 'Erica Watson', 'Left back wheel is shaking'),
       (3, 3, 'Lucy ONeill', 'Radio not turning on');
COMMIT;

-- useful queries --
-- select all tables' data --
SELECT * FROM jobreports; SELECT * FROM customers; SELECT * FROM workdone; SELECT * FROM workers;
-- display workers card --
SELECT a.job_report_id, a.worker_id, b.worker_name FROM jobreports a LEFT JOIN workers b ON a.worker_id = b.worker_id;
-- display job card --
-- ALL JOBS job_report_id, time_date_stamp, customer_name, vehicle_model, vehicle_reg, vehicle_location, miles_on_vehicle, warranty, breakdown --
SELECT a.job_report_id, a.time_date_stamp, b.customer_name, a.vehicle_model, a.vehicle_reg, a.vehicle_location, a.miles_on_vehicle, a.warranty, a.breakdown FROM jobreports a, customers b WHERE a.job_report_id = b.job_report_id;
-- customer_complaint, cause, correction, parts --
SELECT a.customer_complaint, b.cause, b.correction, b.parts FROM customers a, workdone b WHERE a.customer_id = b.work_id;
-- worker_name + work hours --
SELECT a.worker_name, b.work_hours FROM workers a, workdone b WHERE a.worker_id = b.work_id;

-- ONE JOB --
SELECT a.job_report_id, a.time_date_stamp, b.customer_name, a.vehicle_model, a.vehicle_reg, a.vehicle_location, a.miles_on_vehicle, a.warranty, a.breakdown FROM jobreports a, customers b WHERE a.job_report_id = 1 = b.job_report_id = 1;
-- customer_complaint, cause, correction, parts --
SELECT a.customer_complaint, b.cause, b.correction, b.parts FROM customers a, workdone b WHERE a.customer_id = 1 = b.work_id =1;
-- worker_name + work hours --
SELECT a.worker_name, b.work_hours FROM workers a, workdone b WHERE a.worker_id = 1 = b.work_id = 1;