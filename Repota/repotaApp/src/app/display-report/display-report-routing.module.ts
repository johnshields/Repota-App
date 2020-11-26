import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DisplayReportPage} from './display-report.page';

const routes: Routes = [
    {
        path: '',
        component: DisplayReportPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DisplayReportPageRoutingModule {
}
