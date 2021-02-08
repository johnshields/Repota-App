import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {EditPageModule} from './edit/edit.module';

const routes: Routes = [
    {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'create',
        loadChildren: () => import('./create/create.module').then(m => m.CreatePageModule)
    },
    {
        path: 'report-history',
        loadChildren: () => import('./report-history/report-history.module').then(m => m.ReportHistoryPageModule)
    },
    {
        path: 'display-report',
        loadChildren: () => import('./display-report/display-report.module').then(m => m.DisplayReportPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.AccountPageModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
    },
    {
        path: 'edit',
        loadChildren: () => import('./edit/edit.module').then(m => m.EditPageModule)
    },
    {
        path: 'edit/:jobReportId',
        loadChildren: './edit/edit.module#EditPageModule'
    },
    {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
