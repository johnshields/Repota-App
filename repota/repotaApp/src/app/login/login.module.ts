import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LoginPage} from './login.page';
import {ExploreContainerComponentModule} from '../explore-container/explore-container.module';

import {AccountPageRoutingModule} from './login-routing.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        AccountPageRoutingModule
    ],
    declarations: [LoginPage]
})
export class AccountPageModule {
}
