import {Component, OnInit} from '@angular/core';
import {AccountService, JobReportService} from '../services/client_stubs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-report-history',
    templateUrl: './history.page.html',
    styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
    reports: any = [];
    public errorMsg: string;
    public successMsg: string;

    constructor(private api: JobReportService, private router: Router) {
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
