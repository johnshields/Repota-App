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
        console.log('[INFO] DATA RECEIVED FROM HORTON')
        console.log('[INFO] LIST OF REPORTS')
        this.api.getReports().subscribe(data => {
            const str = "true";
            const dbBool = JSON.parse(str);
            this.reports = data + dbBool;
            console.log(data)
            console.log(this.reports);
        });

    }


}
