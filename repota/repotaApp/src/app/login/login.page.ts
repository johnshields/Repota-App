import {Component, OnInit} from '@angular/core';
import {AccountService, InlineObject} from '../services/api-service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

/**
 * @author John Shields
 * @app Repota
 * @title Login Page
 * @desc Handles user logging in.
 *
 * Reference
 * https://stackoverflow.com/questions/57175290/how-to-show-error-message-when-login-fails-in-angular-7/57177646
 */

@Component({
    selector: 'app-account',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {
    private errorMessage;

    constructor(private api: AccountService, private router: Router) {
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
        // User (worker) account model.
        const object: InlineObject = {
            username: form.value.username,
            password: form.value.password
        };

        // Push data to API to login user if object data is correct.
        this.api.login(object).subscribe(() => {
            console.log('Success');
            this.setErrorMessage('');
            form.reset();
            this.router.navigate(['/home']);
        }, error => {
            // get error from response
            let errorMessage = JSON.stringify(error.error.messages);
            this.setErrorMessage(errorMessage);
            console.log(error);
        });
    }

    ngOnInit() {
    }
}
