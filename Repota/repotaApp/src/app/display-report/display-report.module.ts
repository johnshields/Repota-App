import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DisplayReportPageRoutingModule} from './display-report-routing.module';

import {DisplayReportPage} from './display-report.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DisplayReportPageRoutingModule
    ],
    declarations: [DisplayReportPage]
})
export class DisplayReportPageModule {
}
