import {Component} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

/**
 * @author John Shields
 * @title App Component
 * @desc Allows a user to logout with logout button on Hamburger Menu.
 */

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    constructor(private cookieService: CookieService, private router: Router) {
    }

    // Logout user by deleting their cookie and go to the Account Page.
    logout() {
        this.cookieService.delete('session_id');
        this.router.navigate(['']);
    }
}
