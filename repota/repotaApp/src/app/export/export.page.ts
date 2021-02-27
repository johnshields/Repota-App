import {Component, OnInit} from '@angular/core';
import {JobReportService} from '../services/client_stubs';
import {ActivatedRoute, Router} from '@angular/router';
import * as jspdf from 'jspdf';
import domtoimage from 'dom-to-image';

@Component({
    selector: 'app-display-report',
    templateUrl: './export.page.html',
    styleUrls: ['./export.page.scss'],
})
export class ExportPage implements OnInit {
    report: any = [];
    public errorMsg: string;

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
        const div = document.getElementById('job-report');
        const options = { background: 'white', height: 1000, width: 800};
        domtoimage.toPng(div, options).then(
            (dataUrl) =>
            {
                const doc = new jspdf.jsPDF('portrait', 'mm', 'a4');
                doc.addImage(dataUrl, 'PNG', 0, 0, 210, 297);
                doc.save('job_report.pdf');
            })
    }
}

