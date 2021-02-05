import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LoginPage} from './login.page';

import {AccountPageRoutingModule} from './login-routing.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        AccountPageRoutingModule
    ],
    declarations: [LoginPage]
})
export class AccountPageModule {
}
