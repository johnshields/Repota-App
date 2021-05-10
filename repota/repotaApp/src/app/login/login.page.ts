import {Component, OnInit} from '@angular/core';
import {AccountService, InlineObject} from '../services/api-service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from "../services/auth-service/auth.service";

/**
 * @author John Shields
 * @title Login Page
 * @desc Handles user logging in.
 *
 * Reference
 * https://stackoverflow.com/a/57177646
 */

@Component({
    selector: 'app-account',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {
    private errorMessage;
    loginMessage;

    constructor(private api: AccountService, private router: Router, public authService: AuthService) {
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
     * @title Login
     * @desc Uses the InlineObject Model to take in the input and login a user.
     */
    login(form: NgForm) {
        const object: InlineObject = {
            username: form.value.username,
            password: form.value.password
        };

        // Push data to API to login user.
        this.api.login(object).subscribe(() => {
            this.setErrorMessage(''); // clear error message.
            this.ngOnInit();
            form.reset();
            this.router.navigate(['/home']); // allow user in.
        }, error => {
            // Get error from response.
            let errorMessage = JSON.stringify(error.error.messages);
            this.setErrorMessage(JSON.parse(errorMessage));
            console.log(error);
        });
    }

    /**
     * @title ngOnInit
     * @desc If a user navigates to this page when already logged in
     * notify them then clear it after 5000ms.
     */
    async ngOnInit() {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        if (this.authService.loggedIn()) {
            this.loginMessage = 'You are already logged in!'
            await delay(5000);
            this.loginMessage = ''
        }
    }
}
