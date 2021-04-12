import {Component, OnInit} from '@angular/core';
import {JobReportService} from '../services/api-service';

/**
 * @author John Shields
 * @title History Page
 * @desc Gets all user's reports to display.
 */

@Component({
    selector: 'app-report-history',
    templateUrl: './history.page.html',
    styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
    reports: any = [];
    private errorMessage;

    constructor(private api: JobReportService) {
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
     * @title ngOnInit
     * @desc Get all user's reports from API.
     */
    ngOnInit() {
        this.api.getReports().subscribe(data => {
            this.reports = data;
            console.log('Reports have been processed.');
            this.setErrorMessage(''); // clear error message.
            // If User has no reports.
            if (data == null) {
                this.setErrorMessage('You have no reports yet!');
            }
        }, error => {
            // Get error from response.
            let errorMessage = JSON.stringify(error.error.messages);
            this.setErrorMessage(errorMessage);
            console.log(error);
        });
    }

    // Refresh ngOnInit to see Reports.
    refreshPage() {
        this.ngOnInit();
    }
}
