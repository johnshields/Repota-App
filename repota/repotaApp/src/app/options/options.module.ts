import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {OptionsPage} from './options.page';
import {ExploreContainerComponentModule} from '../explore-container/explore-container.module';

import {OptionsPageRoutingModule} from './options-routing.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        RouterModule.forChild([{path: '', component: OptionsPage}]),
        OptionsPageRoutingModule,
    ],
    declarations: [OptionsPage]
})
export class OptionsPageModule {
}
