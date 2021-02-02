import {Component, OnInit} from '@angular/core';

import {JobReportService} from "../services/client_stubs";

@Component({
    selector: 'app-report-history',
    templateUrl: './report-history.page.html',
    styleUrls: ['./report-history.page.scss'],
})
export class ReportHistoryPage implements OnInit {
    reports: any = [];

    constructor(private api: JobReportService) {
        // Function to get a report
    }

    ngOnInit() {
        console.log('[INFO] Reports received from Horton.')
        this.api.getReports().subscribe(data => {
            this.reports = data;
            console.log('[INFO] Reports have been processed.')
            console.log(data)
            console.log(this.reports);
        })

    }


}
