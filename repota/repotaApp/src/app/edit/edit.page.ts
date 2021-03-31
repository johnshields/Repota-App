import {Component, OnInit} from '@angular/core';
import {JobReport, JobReportService} from '../services/api-service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

/**
 * @author John Shields
 * @title Edit Page
 * @desc Gets requested report by its ID so the user can edit it.
 */

@Component({
    selector: 'app-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
    list1: any[];
    list2: any[];
    list3: any[];
    checkBoxValue1: number;
    checkBoxValue2: number;
    checkBoxValue3: number;
    report: any;
    vehicles: any = [];
    space = ' ';
    private errorMessage;

    constructor(private api: JobReportService, private router: Router, private route: ActivatedRoute) {
    }

    /**
     * @title Error message Handlers
     * @desc Functions are used to set and get error message for error responses.
     */
    setErrorMessage(error: String) {
        this.errorMessage = error;
    }

    getErrorMessage() {
        return this.errorMessage;
    }

    /**
     * @title Edit Report
     * @desc Uses the JobReport Model to take in the input and edit/update the report.
     */
    editReport(form: NgForm) {
        // make the true/false values of check boxes to 1s and 0s.
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

        // Use JobReports Model
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

        // Push data to API to edit/update report using the model
        this.api.updateReport(object, this.report[0].jobReportId).subscribe(() => {
            console.log('Success');
            this.setErrorMessage(''); // clear error message.
            this.router.navigate(['/history']);
        }, error => {
            let errorMessage = JSON.stringify(error.error.messages);
            this.setErrorMessage(errorMessage);
            console.log(error);
        });
    }

    // Get the request report by its ID from API.
    ngOnInit() {
        this.api.getReportById(this.route.snapshot.params['jobReportId']).subscribe(data => {
            console.log(this.route.snapshot.params['jobReportId']);
            this.report = data;
            console.log(data);
        });

        // Get vehicle data from API.
        this.api.getCarApiData().subscribe(data => {
            console.log('[INFO] Vehicles have been processed.');
            // Extract JSON data.
            for (let key in data) {
                this.vehicles = data[key];
            }
            this.setErrorMessage(''); // clear error message.
        }, error => {
            let errorMessage = JSON.stringify(error.error.messages);
            this.setErrorMessage(errorMessage);
            console.log(error);
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
            title: 'Complete',
            checked: false,
            value: 0
        }];
    }
}
