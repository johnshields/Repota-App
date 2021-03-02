import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ExportPageRoutingModule} from './export-routing.module';
import {ExportPage} from './export.page';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ExportPageRoutingModule,
        MatCheckboxModule
    ],
    declarations: [ExportPage]
})
export class ExportPageModule {
}
