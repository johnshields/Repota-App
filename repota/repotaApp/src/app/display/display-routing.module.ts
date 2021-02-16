import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DisplayPage} from './display.page';
import {HttpHeaders, HttpParameterCodec} from '@angular/common/http';
import {Configuration} from 'jasmine-spec-reporter/built/configuration';

const routes: Routes = [
    {
        path: '',
        component: DisplayPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DisplayPageRoutingModule {

    protected basePath = 'http://localhost/api/v1';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;
}
