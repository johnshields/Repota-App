import {Component, OnInit} from '@angular/core';
import {JobReport, JobReportService} from '../services/client_stubs';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
    errorMsg: string;
    list1: any[];
    list2: any[];
    list3: any[];
    checkBoxValue: number;

    constructor(private api: JobReportService) {
    }

    createReport(form: NgForm) {
        console.log(form.value.warranty);
        console.log(form.value.breakdown);
        console.log(form.value.jobComplete);

        // make the true/false values to 1s and 0s
        // warranty
        if (form.value.warranty === true) {
            this.checkBoxValue = 1;
        } else {
            this.checkBoxValue = 0;
        }
        // breakdown
        if (form.value.breakdown === true) {
            this.checkBoxValue = 1;
        } else {
            this.checkBoxValue = 0;
        }
        // job complete
        if (form.value.jobComplete === true) {
            this.checkBoxValue = 1;
        } else {
            this.checkBoxValue = 0;
        }

        // use JobReports Model
        const object: JobReport = {
            date: form.value.date,
            vehicleModel: form.value.vehicleModel,
            vehicleReg: form.value.vehicleReg,
            milesOnVehicle: form.value.milesOnVehicle,
            vehicleLocation: form.value.vehicleLocation,
            warranty: this.checkBoxValue,
            breakdown: this.checkBoxValue,
            customerName: form.value.customerName,
            complaint: form.value.complaint,
            cause: form.value.cause,
            correction: form.value.correction,
            parts: form.value.parts,
            workHours: form.value.workHours,
            jobComplete: this.checkBoxValue
        };

        // create the report using the model
        this.api.createReport(object).subscribe(data => {
            if (data != null) {
                this.api.createReport(data);
                console.log('Success');
            } else {
                this.errorMsg = 'Report not created.';
            }
        });
    }

    // Lists for check box values
    ngOnInit() {
        this.list1 = [{
            id: 1,
            title: 'Warranty',
            checked: false,
            value: 0
        }];
        this.list2 = [{
            id: 1,
            title: 'Breakdown',
            checked: false,
            value: 0
        }];
        this.list3 = [{
            id: 1,
            title: 'Job Complete',
            checked: false,
            value: 0
        }];
    }
}
