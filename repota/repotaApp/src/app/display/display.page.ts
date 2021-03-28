import {Component, OnInit} from '@angular/core';
import {JobReportService} from '../services/api-service';
import {ActivatedRoute, Router} from '@angular/router';

/**
 * @author John Shields
 * @title Display Page
 * @desc Gets requested report by its ID to display the report by itself to the user.
 * Plus a delete report function for the delete button.
 */

@Component({
    selector: 'app-display',
    templateUrl: './display.page.html',
    styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {
    report: any = [];
    private errorMessage;

    constructor(private api: JobReportService, private route: ActivatedRoute, private router: Router) {
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

    ngOnInit() {
        // Get requested report by its ID.
        this.api.getReportById(this.route.snapshot.params['jobReportId']).subscribe(data => {
            console.log(this.route.snapshot.params['jobReportId']);
            this.report = data;
            this.setErrorMessage(''); // clear error message.
        }, error => {
            let errorMessage = JSON.stringify(error.error.messages);
            this.setErrorMessage(errorMessage);
            console.log(error);
        });
    }

    // delete report with requested ID.
    deleteReport(id: number) {
        // Pop up box to make sure the User wants to delete the Report.
        if(confirm("Are you sure to delete" + " Report Number " + id + "?")) {
            this.api.deleteReport(id).subscribe(() => {
                console.log('Success');
                this.setErrorMessage(''); // clear error message.
                this.router.navigate(['/history']);
            }, error => {
                let errorMessage = JSON.stringify(error.error.messages);
                this.setErrorMessage(errorMessage);
                console.log(error);
            });
        }
    }
}

