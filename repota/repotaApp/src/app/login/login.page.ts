import {Component} from '@angular/core';
import {AccountService, InlineObject} from '../services/client_stubs';
import {NgForm} from '@angular/forms';


@Component({
    selector: 'app-account',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss']
})
export class LoginPage {
    errorMsg: string;

    constructor(private api: AccountService) {
    }

    //
    loginWorker(form: NgForm) {
        const object: InlineObject = {
            username: form.value.username,
            password: form.value.password
        };

        this.api.login(object).subscribe(data => {
            console.log(data);
            if (data.success) {
                this.api.login(data);
                console.log('Success');
            } else {
                this.errorMsg = 'Details are not correct.';
            }
        });
    }
}
