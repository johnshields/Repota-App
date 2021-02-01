-- ALL REPORTS --
SELECT DISTINCT jr.job_report_id, jr.date_stamp, jr.vehicle_model, jr.vehicle_reg, jr.miles_on_vehicle,
       jr.vehicle_location, jr.warranty, jr.breakdown, cust.customer_name, cust.customer_complaint,
       jr.cause, jr.correction, jr.parts, jr.work_hours, wkr.worker_name, jr.job_report_complete
    FROM jobreports jr
    INNER JOIN customers cust
        ON jr.job_report_id = cust.job_report_id
    INNER JOIN workers wkr ON jr.worker_id = wkr.worker_id WHERE wkr.worker_id = 141;

-- CREATE A REPORT --
START TRANSACTION;
INSERT INTO jobreports
    (job_report_id, worker_id, date_stamp, vehicle_model, vehicle_reg, vehicle_location, miles_on_vehicle,
     warranty, breakdown, cause, correction, parts, work_hours, job_report_complete)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
INSERT INTO customers (customer_id, job_report_id, customer_name, customer_complaint) VALUES (?, ?, ?, ?);
INSERT INTO workers (worker_id, username, worker_name, hash) VALUES (?, ?, ?, ?);
COMMIT;

-- DELETE A REPORT --
DELETE FROM jobreports WHERE job_report_id = 121;

-- UPDATE A REPORT --
UPDATE jobreports jr
    SET jr.date_stamp = ?, jr.vehicle_model = ?, jr.vehicle_reg = ?, jr.miles_on_vehicle = ?,
   jr.vehicle_location = ?, jr.warranty = ?, jr.breakdown = ?, jr.cause = ?, jr.correction = ?,
    jr.parts = ?, jr.work_hours = ?, jr.job_report_complete = ?
WHERE jr.job_report_id = ?;
