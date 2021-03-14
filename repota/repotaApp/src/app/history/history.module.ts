import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {HistoryPageRoutingModule} from './history-routing.module';

import {HistoryPage} from './history.page';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HistoryPageRoutingModule,
        MatCheckboxModule,
        MatFormFieldModule
    ],
    declarations: [HistoryPage]
})
export class HistoryPageModule {
}
