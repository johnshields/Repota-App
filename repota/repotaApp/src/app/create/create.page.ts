import {Component} from '@angular/core';
import {JobReport, JobReportService} from "../services/client_stubs";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage {
    errorMsg: string;

    constructor(private api: JobReportService) {
    }

    createReport(form: NgForm) {
        // use JobReports Model
        const object: JobReport = {
            date: form.value.date,
            vehicleModel: form.value.vehicleModel,
            vehicleReg: form.value.vehicleReg,
            milesOnVehicle: form.value.milesOnVehicle,
            vehicleLocation: form.value.vehicleLocation,
            warranty: form.value.warranty,
            breakdown: form.value.breakdown,
            customerName: form.value.customerName,
            customerComplaint: form.value.customerComplaint,
            cause: form.value.cause,
            correction: form.value.correction,
            parts: form.value.parts,
            workHours: form.value.workHours,
            jobComplete: form.value.jobComplete
        }

        this.api.createReport(object).subscribe(data => {
            if (data.success) {
                this.api.createReport(data)
                console.log('Success');
            } else {
                this.errorMsg = 'Report not created.';
            }
        });
    }
}
