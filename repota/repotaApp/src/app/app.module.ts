import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicModule} from '@ionic/angular';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApiModule, JobReportService, AccountService} from './services/client_stubs';
import {HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        ApiModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatDialogModule,
        MatButtonModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
        ApiModule,
        JobReportService,
        AccountService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
