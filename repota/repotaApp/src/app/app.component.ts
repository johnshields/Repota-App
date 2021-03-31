import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from './services/api-service';

/**
 * @author John Shields
 * @title App Component
 * @desc Allows a User to logout with logout button on Hamburger Menu.
 */

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(private api: AccountService, private router: Router) {
    }

    // Logout user by calling API and go to the Account Page.
    logout() {
        this.api.logout().subscribe(() => {
            console.log('Success');
            this.router.navigate(['']);
        }, error => {
            console.log(error);
        });
    }
}
