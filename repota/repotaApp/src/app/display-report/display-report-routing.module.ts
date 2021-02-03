import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DisplayReportPage} from './display-report.page';
import {HttpHeaders, HttpParameterCodec} from '@angular/common/http';
import {Configuration} from 'jasmine-spec-reporter/built/configuration';

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

    protected basePath = 'http://localhost/api/v1';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

}
