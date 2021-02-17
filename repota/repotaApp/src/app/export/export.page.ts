import {Component, OnInit} from '@angular/core';
import {JobReportService} from '../services/client_stubs';
import {ActivatedRoute} from '@angular/router';
import * as html2pdf from 'html2pdf.js';

@Component({
    selector: 'app-display-report',
    templateUrl: './export.page.html',
    styleUrls: ['./export.page.scss'],
})
export class ExportPage implements OnInit {
    report: any = [];
    public errorMsg: string;

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


    // export report to a pdf
    onExportPDF() {
        const options = {
            filename: 'job_report.pdf',
            image: {type: 'jpeg', quality: 0.98},
            html2canvas: {scale: 2, logging: true, dpi: 192, letterRendering: true},
            jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait'}
        };
        const content: Element = document.getElementById('job-report');

        html2pdf()
            .from(content)
            .set(options)
            .save();
    }
}
