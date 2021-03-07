import {Component, OnInit} from '@angular/core';
import {JobReportService} from '../services/client_stubs';
import {ActivatedRoute, Router} from '@angular/router';

/**
 * @author John Shields
 * @title Display Page
 * @desc Gets requested report by its ID to display the report by itself to the user.
 * Plus a delete report function for the delete button.
 */

@Component({
    selector: 'app-display',
    templateUrl: './display.page.html',
    styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {
    report: any = [];

    constructor(private api: JobReportService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        // Get requested report by its ID.
        this.api.getReportById(this.route.snapshot.params['jobReportId']).subscribe(data => {
            console.log(this.route.snapshot.params['jobReportId']);
            this.report = data;
            console.log(data);
        }, error => {
            console.log(error);
        });
    }

    // delete report with requested ID.
    deleteReport(id: number) {
        this.api.deleteReport(id).subscribe(() => {
            console.log('Success');
            this.router.navigate(['/history']);
        }, error => {
            console.log(error);
        });
    }
}

