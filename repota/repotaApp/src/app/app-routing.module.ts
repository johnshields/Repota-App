import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
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
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule)
    },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
