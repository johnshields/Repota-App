import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {OptionsPage} from './options.page';

import {OptionsPageRoutingModule} from './options-routing.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: OptionsPage}]),
        OptionsPageRoutingModule,
    ],
    declarations: [OptionsPage]
})
export class OptionsPageModule {
}
