import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ReportHistoryPage} from './report-history.page';

const routes: Routes = [
    {
        path: '',
        component: ReportHistoryPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReportHistoryPageRoutingModule {
}
