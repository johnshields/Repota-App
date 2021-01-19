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
    }

    getCustomerReports(customerName: string) {
        this.api.getCustomerReports(customerName).subscribe(data => {
            this.reports = data;
        })
    }

    ngOnInit() {
        console.log('DATA RECEIVED FROM HORTON')
        console.log('LIST OF REPORTS')
        this.api.getReports().subscribe(data => {
            this.reports = data;
            console.log(data)
            console.log(this.reports);
        });
    }
}
