import {Component, OnInit} from '@angular/core';
import {JobReportService} from '../services/client_stubs';
import * as html2pdf from 'html2pdf.js';

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
        console.log('[INFO] Reports received from Horton.');
        this.api.getReports().subscribe(data => {
            this.reports = data;
            console.log('[INFO] Reports have been processed.');
            console.log(this.reports);
        });

    }

    // export report to a pdf
    onExportPDF() {
        const options = {
            filename: 'job_report.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        const content: Element = document.getElementById('job-report');

        html2pdf()
            .from(content)
            .set(options)
            .save();
    }

    // delete report
    deleteReport(id: number) {
        this.api.deleteReport(id).subscribe(() => {
            this.successMsg = 'Report deleted.';
            this.ngOnInit();
        });
    }
}
