import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CreatePage} from './create.page';

const routes: Routes = [
    {
        path: '',
        component: CreatePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CreatePageRoutingModule {
}
