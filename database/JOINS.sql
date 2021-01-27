-- JOHN SHIELDS --
-- JOIN QUERIES FOR REPOTA DATABASE --

-- ALL REPORTS --
SELECT DISTINCT jr.job_report_id, jr.time_date_stamp, jr.vehicle_model, jr.vehicle_reg, jr.miles_on_vehicle,
       jr.vehicle_location, jr.warranty, jr.breakdown, cust.customer_name, cust.customer_complaint,
       wd.cause, wd.correction, wd.parts, wd.work_hours, wkr.worker_name
    FROM jobreports jr
    INNER JOIN workdone wd
        ON jr.work_done_id = wd.work_id
    INNER JOIN customers cust
        ON jr.job_report_id = cust.job_report_id
    INNER JOIN workers wkr on jr.worker_id = wkr.worker_id;

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

-- SELECT ALL THE REPORTS BY A SPECIFIC CUSTOMER NAME --
SELECT DISTINCT jr.job_report_id, jr.time_date_stamp, jr.vehicle_model, jr.vehicle_reg, jr.miles_on_vehicle,
       jr.vehicle_location, jr.warranty, jr.breakdown, cust.customer_name, cust.customer_complaint,
       wd.cause, wd.correction, wd.parts, wd.work_hours, wkr.worker_name
    FROM jobreports jr
    INNER JOIN workdone wd
        ON jr.work_done_id = wd.work_id
    INNER JOIN customers cust
        ON jr.job_report_id = cust.job_report_id
    INNER JOIN workers wkr on jr.worker_id = wkr.worker_id WHERE customer_name = 'Humphrey Bogart';

-- SELECT A REPORT BY A SPECIFIC REPORT ID, DATE AND CUSTOMER NAME --
SELECT DISTINCT jr.job_report_id, jr.time_date_stamp, jr.vehicle_model, jr.vehicle_reg, jr.miles_on_vehicle,
       jr.vehicle_location, jr.warranty, jr.breakdown, cust.customer_name, cust.customer_complaint,
       wd.cause, wd.correction, wd.parts, wd.work_hours, wkr.worker_name
    FROM jobreports jr
    INNER JOIN workdone wd
        ON jr.work_done_id = wd.work_id
    INNER JOIN customers cust
        ON jr.job_report_id = cust.job_report_id
    INNER JOIN workers wkr on jr.worker_id = wkr.worker_id WHERE jr.job_report_id = ? AND jr.time_date_stamp = ? AND customer_name = ?;
