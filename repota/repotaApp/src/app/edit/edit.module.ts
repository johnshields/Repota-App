import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {EditPageRoutingModule} from './edit-routing.module';

import {EditPage} from './edit.page';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditPageRoutingModule,
        MatCheckboxModule
    ],
    declarations: [EditPage]
})
export class EditPageModule {
}
