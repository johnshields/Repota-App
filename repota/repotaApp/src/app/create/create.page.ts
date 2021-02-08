import {Component, OnInit} from '@angular/core';
import {JobReport, JobReportService} from '../services/client_stubs';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

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
    checkBoxValue1: number;
    checkBoxValue2: number;
    checkBoxValue3: number;
    private errorMessage;

    constructor(private api: JobReportService, private router: Router) {
    }

    setErrorMessage(error: String) {
        this.errorMessage = error;
    }

    createReport(form: NgForm) {

        // make the true/false values to 1s and 0s
        // warranty
        if (form.value.warranty === true) {
            this.checkBoxValue1 = 1;
        } else {
            this.checkBoxValue1 = 0;
        }
        // breakdown
        if (form.value.breakdown === true) {
            this.checkBoxValue2 = 1;
        } else {
            this.checkBoxValue2 = 0;
        }
        // job complete
        if (form.value.jobComplete === true) {
            this.checkBoxValue3 = 1;
        } else {
            this.checkBoxValue3 = 0;
        }

        // use JobReports Model
        const object: JobReport = {
            date: form.value.date,
            vehicleModel: form.value.vehicleModel,
            vehicleReg: form.value.vehicleReg,
            milesOnVehicle: form.value.milesOnVehicle,
            vehicleLocation: form.value.vehicleLocation,
            warranty: this.checkBoxValue1,
            breakdown: this.checkBoxValue2,
            customerName: form.value.customerName,
            complaint: form.value.complaint,
            cause: form.value.cause,
            correction: form.value.correction,
            parts: form.value.parts,
            workHours: form.value.workHours,
            jobComplete: this.checkBoxValue3
        };

        // create the report using the model
        this.api.createReport(object).subscribe(data => {
            console.log(data);
            if (form != null) {
                this.router.navigate(['tabs/report-history']);
                this.api.createReport(data);
                console.log('Success');
            } else if (data.errorCode === 'ER_DUP_ENTRY') {
                this.errorMsg = 'Failed to create Report.';
            } else {
                this.setErrorMessage(data.message);
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
