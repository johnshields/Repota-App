import {Component, OnInit} from '@angular/core';
import {AccountService, InlineObject} from '../services/api-service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

/**
 * @author John Shields
 * @title Register Page
 * @desc Handles user registration.
 */

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
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
     * @title Register
     * @desc Uses the InlineObject Model to take in the input and register a new user.
     */
    register(form: NgForm) {
        const object: InlineObject = {
            username: form.value.username,
            name: form.value.name,
            password: form.value.password,
        };

        // Push data to API to register user.
        this.api.register(object).subscribe(() => {
            console.log('Registered');
            this.setErrorMessage(''); // clear error message.
            form.reset();
            this.router.navigate(['/login']);
        }, error => {
            // Get error from response.
            let errorMessage = JSON.stringify(error.error.messages);
            this.setErrorMessage(errorMessage);
            console.log(error);
        });
    }

    ngOnInit() {
    }
}
