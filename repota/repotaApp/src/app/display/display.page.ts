import {Component, OnInit} from '@angular/core';
import {JobReportService} from '../services/client_stubs';
import {ActivatedRoute} from '@angular/router';
import * as jspdf from 'jspdf';
import domtoimage from 'dom-to-image';

@Component({
    selector: 'app-display',
    templateUrl: './display.page.html',
    styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {
    report: any = [];
    public errorMsg: string;
    public successMsg: string;

    constructor(private api: JobReportService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        // Get requested report by its ID
        this.api.getReportById(this.route.snapshot.params['jobReportId']).subscribe(data => {
            console.log(this.route.snapshot.params['jobReportId']);
            this.report = data;
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

