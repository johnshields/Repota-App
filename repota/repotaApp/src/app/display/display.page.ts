import {Component, OnInit} from '@angular/core';
import {JobReportService} from '../services/client_stubs';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-display',
    templateUrl: './display.page.html',
    styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {
    jobReport: any = [];
    public errorMsg: string;
    public successMsg: string;

    constructor(private api: JobReportService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        // set dark theme to default theme
        document.body.setAttribute('color-theme', 'dark');

        // Get requested report by it's ID
        this.api.getReportById(this.route.snapshot.params['jobReportId']).subscribe(data => {
            console.log(this.route.snapshot.params['jobReportId']);
            this.jobReport = data;
            console.log(data);
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

