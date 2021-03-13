import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CreatePageRoutingModule} from './create-routing.module';

import {CreatePage} from './create.page';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatOptionModule} from '@angular/material/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreatePageRoutingModule,
        MatCheckboxModule,
        MatOptionModule,
    ],
    declarations: [CreatePage]
})
export class CreatePageModule {
}
