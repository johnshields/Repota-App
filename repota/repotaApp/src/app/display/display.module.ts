import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DisplayPageRoutingModule} from './display-routing.module';

import {DisplayPage} from './display.page';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DisplayPageRoutingModule,
        MatCheckboxModule,
        MatFormFieldModule
    ],
    declarations: [DisplayPage]
})
export class DisplayPageModule {
}
