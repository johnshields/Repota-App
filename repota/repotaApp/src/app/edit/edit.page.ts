import {Component, OnInit} from '@angular/core';
import {JobReport, JobReportService} from '../services/client_stubs';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
    errorMsg: string;
    list1: any[];
    list2: any[];
    list3: any[];
    checkBoxValue1: number;
    checkBoxValue2: number;
    checkBoxValue3: number;
    report: any;
    private errorMessage;

    constructor(private api: JobReportService, private router: Router, private route: ActivatedRoute) {
    }

    setErrorMessage(error: String) {
        this.errorMessage = error;
    }

    editReport(form: NgForm) {
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
            cause: form.value.cause,
            correction: form.value.correction,
            parts: form.value.parts,
            workHours: form.value.workHours,
            jobComplete: this.checkBoxValue3
        };

        // Update report with object
        this.api.updateReport(object, this.report[0].jobReportId).subscribe(data => {
            if (form.submitted) {
                this.router.navigate(['tabs/report-history']);
                console.log('Success');
            } else {
                this.setErrorMessage(data.message);
            }
        });
    }

    ngOnInit() {
        // set dark theme to default theme
        document.body.setAttribute('color-theme', 'dark');

        // Get the request report by it's ID
        this.api.getReportById(this.route.snapshot.params['jobReportId']).subscribe(data => {
            console.log(this.route.snapshot.params['jobReportId']);
            this.report = data;
            console.log(data);
        });

        // Lists for check box values
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
