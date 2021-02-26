import {Component, OnInit} from '@angular/core';
import {JobReportService} from '../services/client_stubs';

@Component({
    selector: 'app-report-history',
    templateUrl: './history.page.html',
    styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
    reports: any = [];
    public errorMsg: string;
    public successMsg: string;

    constructor(private api: JobReportService) {
    }

    ngOnInit() {
        // get all worker's reports
        this.api.getReports().subscribe(data => {
            this.reports = data;
            console.log('[INFO] Reports have been processed.');
            console.log(this.reports);
        });
    }

    // refresh page to see new reports
    refreshPage() {
        window.location.reload();
    }
}
