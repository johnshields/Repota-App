/*
 * John Shields
 * Horton - API version: 1.0.0
 *
 * Job Report
 * Model for getting reports details plus creating and updating reports.
 */

package models

type JobReport struct {
	JobReportId int32 `json:"jobReportId,omitempty"`

	Date string `json:"date,omitempty"`

	VehicleModel string `json:"vehicleModel,omitempty"`

	VehicleReg string `json:"vehicleReg,omitempty"`

	VehicleLocation string `json:"vehicleLocation,omitempty"`

	MilesOnVehicle int32 `json:"milesOnVehicle,omitempty"`

	Warranty int32 `json:"warranty"`

	Breakdown int32 `json:"breakdown"`

	CustomerName string `json:"customerName,omitempty"`

	Complaint string `json:"complaint,omitempty"`

	Cause string `json:"cause,omitempty"`

	Correction string `json:"correction,omitempty"`

	Parts string `json:"parts,omitempty"`

	WorkHours int32 `json:"workHours,omitempty"`

	WorkerName string `json:"workerName,omitempty"`

	JobComplete int32 `json:"jobComplete"`
}
