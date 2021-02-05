import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'home',
                loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
            },
            {
                path: 'account',
                loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule)
            },
            {
                path: 'login',
                loadChildren: () => import('../login/login.module').then(m => m.AccountPageModule)
            },
            {
                path: 'register',
                loadChildren: () => import('../register/register.module').then(m => m.RegisterPageModule)
            },
            {
                path: 'options',
                loadChildren: () => import('../options/options.module').then(m => m.OptionsPageModule)
            },
            {
                path: 'create',
                loadChildren: () => import('../create/create.module').then(m => m.CreatePageModule)
            },
            {
                path: 'report-history',
                loadChildren: () => import('../report-history/report-history.module').then(m => m.ReportHistoryPageModule)
            },
            {
                path: 'report-display',
                loadChildren: () => import('../display-report/display-report.module').then(m => m.DisplayReportPageModule)
            },
            {
                path: 'edit',
                loadChildren: () => import('../edit/edit.module').then(m => m.EditPageModule)
            },
            {
                path: '',
                redirectTo: '/tabs/account',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/account',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
