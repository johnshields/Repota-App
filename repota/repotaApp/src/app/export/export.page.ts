import {Component, OnInit} from '@angular/core';
import {JobReportService} from '../services/api-service';
import {ActivatedRoute, Router} from '@angular/router';
import * as jspdf from 'jspdf';
import domtoimage from 'dom-to-image';

/**
 * @author John Shields
 * @title Export Page
 * @desc Allows a user to export a report to a PDF.
 *
 * References
 * https://www.npmjs.com/package/dom-to-image
 * https://www.npmjs.com/package/jspdf
 */

@Component({
    selector: 'app-display-report',
    templateUrl: './export.page.html',
    styleUrls: ['./export.page.scss'],
})
export class ExportPage implements OnInit {
    report: any = [];

    constructor(private api: JobReportService, private route: ActivatedRoute, private router: Router) {
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
        const content = document.getElementById('job-report');
        const options = {background: 'white', width: 650, quality: 0.98};
        domtoimage.toPng(content, options).then(
            (dataUrl) => {
                const doc = new jspdf.jsPDF('portrait', 'mm', 'a4', true);
                doc.addImage(dataUrl, 'jpeg', 0, 0, 210, 297);
                doc.save('job_report.pdf');
            });
    }
}

