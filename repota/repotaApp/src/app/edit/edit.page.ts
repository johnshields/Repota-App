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
    checkBoxValue: number;
    jobReportId: any [];
    private router: Router;
    private route: ActivatedRoute;
    private report: any;

    constructor(private api: JobReportService) {
    }

    editReport(form: NgForm) {
        console.log(form.value.warranty);
        console.log(form.value.breakdown);
        console.log(form.value.jobComplete);
        console.log(form.value.jobReportId);
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
            cause: form.value.cause,
            correction: form.value.correction,
            parts: form.value.parts,
            workHours: form.value.workHours,
            jobComplete: this.checkBoxValue
        };

        this.api.updateReport(object, this.report[0].jobReportId).subscribe(data => {
            if (data.status) {
                this.router.navigate(['tabs/home']);
                this.api.updateReport(data, this.report[0].jobReportId);
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
