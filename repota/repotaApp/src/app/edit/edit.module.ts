import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {EditPageRoutingModule} from './edit-routing.module';

import {EditPage} from './edit.page';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatOptionModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditPageRoutingModule,
        MatCheckboxModule,
        MatOptionModule,
        MatFormFieldModule
    ],
    declarations: [EditPage]
})
export class EditPageModule {
}
