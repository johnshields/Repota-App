import {Component, OnInit} from '@angular/core';
import {AccountService, InlineObject} from '../services/client_stubs';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
    selector: 'app-account',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {
    private errorMessage;

    constructor(private api: AccountService, private router: Router) {
    }

    setErrorMessage(error: String) {
        this.errorMessage = error;
    }

    getErrorMessage() {
        return this.errorMessage;
    }

    login(form: NgForm) {
        // Worker account model
        const object: InlineObject = {
            username: form.value.username,
            password: form.value.password
        };

        // login worker
        this.api.login(object).subscribe(data => {
            if (form.valid) {
                console.log('Success');
                this.router.navigate(['/home']);
            } else {
                this.setErrorMessage(data.message);
            }
        });
    }

    ngOnInit() {}
}
