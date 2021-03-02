import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginPage} from './login.page';
import {AccountPageRoutingModule} from './login-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AccountPageRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatDialogModule,
        MatButtonModule
    ],
    declarations: [LoginPage]
})
export class AccountPageModule {
}
