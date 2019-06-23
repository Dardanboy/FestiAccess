import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs/tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children:
            [
                {
                    path: 'main',
                    children:
                        [
                            {
                                path: '',
                                loadChildren: '../main/main.module#MainPageModule'
                            }
                        ]
                },
                {
                    path: 'friends',
                    children:
                        [
                            {
                                path: '',
                                loadChildren: '../friends/friends.module#FriendsPageModule',
                            }
                        ]
                },
                {
                    path: 'settings',
                    children:
                        [
                            {
                                path: '',
                                loadChildren: '../settings/settings.module#SettingsPageModule'
                            }
                        ]
                },
                {
                    path: '',
                    redirectTo: '/tabs/main',
                    pathMatch: 'full'
                }
            ]
    },
    {
        path: '',
        redirectTo: '/tabs/main',
        pathMatch: 'full'
    }
];

@NgModule({
    imports:
        [
            RouterModule.forChild(routes)
        ],
    exports:
        [
            RouterModule
        ]
})
export class TabsPageRoutingModule {
}
