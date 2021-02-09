import {Component, OnInit} from '@angular/core';
import {JobReportService} from '../services/client_stubs';

@Component({
    selector: 'app-report-history',
    templateUrl: './report-history.page.html',
    styleUrls: ['./report-history.page.scss'],
})
export class ReportHistoryPage implements OnInit {
    reports: any = [];
    public errorMsg: string;
    public successMsg: string;

    constructor(private api: JobReportService) {
    }

    ngOnInit() {
        // set dark theme to default theme
        document.body.setAttribute('color-theme', 'dark');

        // get all worker's reports
        console.log('[INFO] Reports received from Horton.');
        this.api.getReports().subscribe(data => {
            this.reports = data;
            console.log('[INFO] Reports have been processed.');
            console.log(this.reports);
        });
    }

    // delete report
    deleteReport(id: number) {
        this.api.deleteReport(id).subscribe(() => {
            this.successMsg = 'Report deleted.';
            this.ngOnInit();
        });
    }
}
