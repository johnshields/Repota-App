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
    worker_id   int(5) unsigned NOT NULL AUTO_INCREMENT,
    username    varchar(20)     NOT NULL UNIQUE,
    worker_name varchar(50)     NOT NULL,
    hash        varchar(255)    NOT NULL,
    PRIMARY KEY (worker_id),
    UNIQUE KEY (worker_name)
) ENGINE = InnoDB
  AUTO_INCREMENT = 6;
-- workers table --
INSERT INTO workers (worker_id, username, worker_name, hash)
VALUES (141, 'john_shields', 'John Shields', '$2a$10$ttINUB.yZkZUKiKSBqRMf.jzRYIL8.MLMldre63SA5u9DtJjuvMNO'),
       (174, 'steve_mon', 'Steve Maloney', '$2a$10$56hLopYTrwAvJs/4Q84vTOcC.T5KCUmR1.m92gcqkKBnQg7qnW8pW');
COMMIT;

-- jobReports table --
CREATE TABLE IF NOT EXISTS jobreports
(
    job_report_id       int(6) unsigned NOT NULL AUTO_INCREMENT,
    worker_id           int(5) unsigned NOT NULL,
    date_stamp     varchar(20)     NOT NULL,
    vehicle_model       varchar(60)     NOT NULL,
    vehicle_reg         varchar(60)     NOT NULL,
    vehicle_location    varchar(500)    NOT NULL,
    miles_on_vehicle    int(20)         NOT NULL,
    warranty            boolean         NOT NULL DEFAULT 1,
    breakdown           boolean         NOT NULL DEFAULT 0,
    cause               varchar(500),
    correction          varchar(500),
    parts               varchar(500),
    work_hours          int(10),
    job_report_complete boolean         NOT NULL DEFAULT 0,
    PRIMARY KEY (job_report_id),
    FOREIGN KEY (worker_id) REFERENCES workers (worker_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 6;
-- jobReports table --
INSERT INTO jobreports (job_report_id, worker_id, date_stamp, vehicle_model, vehicle_reg,
                        vehicle_location,
                        miles_on_vehicle, warranty, breakdown, cause, correction, parts, work_hours,
                        job_report_complete)
VALUES (121, 141, '03-04-2020', 'Ford Focus', '151-DL-2308', 'Gort, Co. Galway', '508538', TRUE, FALSE,
        'The lock on the passenger door was broken.', 'A new lock has been fitted.', '1 DOOR LOCK', '1', TRUE),
       (251, 174, '06-04-2020', 'Toyota Yaris', '08-KY-667', 'Laban, Co. Galway', '648598', TRUE, FALSE,
        'The left back wheel bearing was worn.', 'Fitted a new wheel bearing.', '1 WHEEL BEARING', '2', TRUE),
       (342, 174, '07-04-2020', 'Hyundai i30', '163-TS-1459', 'Barefield, Co. Clare', '700891', TRUE, FALSE,
        'The radio connections were disconnected.', 'The radio connections have been reconnected.', 'NONE', '1', TRUE),
       (456, 141, '08-04-2020', 'Ford Mustang', '54-SF-135', 'Furbogh, Co. Galway', '1007538', TRUE, FALSE,
        'Worn out tires.', 'New tires have been fitted.', '4 TIRES', '1', TRUE),
       (543, 141, '12-04-2020', 'Volkswagen Passat', '07-DL-298', 'Westside, Co. Galway', '708538', TRUE, FALSE,
        'Service on vehicle was due.', 'Serviced vehicle.', '1 OIL FILTER', '2', TRUE),
       (651, 174, '14-04-2020', 'Honda Civic', '131-DL-298', 'Ballybane, Co. Galway', '318639', TRUE, TRUE,
        'Cables were eroded.', 'Entire system has been replaced.', '2 CABLES, 2 BRAKE PADS', '3', TRUE);
COMMIT;

-- customers table --
CREATE TABLE IF NOT EXISTS customers
(
    customer_id        int(6) unsigned NOT NULL AUTO_INCREMENT,
    job_report_id      int(6) unsigned NOT NULL,
    customer_name      varchar(50)     NOT NULL,
    customer_complaint varchar(500)    NOT NULL,
    PRIMARY KEY (customer_id),
    FOREIGN KEY (job_report_id) REFERENCES jobreports (job_report_id) ON DELETE CASCADE ON UPDATE CASCADE
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

-- session table for session cookies --
CREATE TABLE session
(
    id           VARCHAR(255)        NOT NULL, -- UUID
    user         INTEGER(4) unsigned NOT NULL,
    expire_after INT(8)              NOT NULL, -- Unix epoch time store

    PRIMARY KEY (id),
    FOREIGN KEY (user) REFERENCES workers (worker_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = INNODB;

-- SELECT ALL TABLES' DATA --
SELECT * FROM jobreports;
SELECT * FROM customers;
SELECT * FROM workers;
