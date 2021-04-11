/**
 * @author John Shields
 * @title JobReport Model - OpenAPI spec version: 1.0.0
 * @desc Model for creating and updating reports.
 */

export interface JobReport {
    jobReportId?: number;
    date?: string;
    vehicleModel?: string;
    vehicleReg?: string;
    milesOnVehicle?: number;
    vehicleLocation?: string;
    warranty?: number;
    breakdown?: number;
    customerName?: string;
    complaint?: string;
    cause?: string;
    correction?: string;
    parts?: string;
    workHours?: number;
    workerName?: string;
    jobComplete?: number;
}
