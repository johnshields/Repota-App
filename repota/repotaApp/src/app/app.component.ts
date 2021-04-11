import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from './services/api-service';
import {AuthService} from "./services/auth-service/auth.service";

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
export class AppComponent{
    private errorMessage;
    constructor(private router: Router, private api: AccountService, public authService: AuthService) {
    }

    /**
     * @title Error message Handlers
     * @desc Functions are used to set and get error message for error responses.
     */
    setErrorMessage(error: String) {
        this.errorMessage = error;
    }

    getErrorMessage() {
        return this.errorMessage;
    }

    /**
     * @title Home
     * @desc If a User clicks Home when not logged in notify them then clear it after 5000ms.
     */
    async home() {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        if (!this.authService.loggedIn()) {
            this.setErrorMessage('Please login first');
            await delay(5000);
            this.setErrorMessage(''); // clear error message.
        }
    }

    /**
     * @title Logout
     * @desc Logout user by calling API and go to the Account Page.
     * Only allow a logged in user to use Logout button.
     */
    logout() {
        if (this.authService.loggedIn()) {
            this.api.logout().subscribe(() => {
                console.log('Logged out');
                this.router.navigate(['']);
                this.setErrorMessage('');
            }, error => {
                let errorMessage = JSON.stringify(error.error.messages);
                this.setErrorMessage(errorMessage);
                console.log(error);
            });
        }
    }
}
