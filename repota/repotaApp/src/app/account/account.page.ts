import {Component} from '@angular/core';
import {AccountService, InlineObject} from "../services/client_stubs";
import {NgForm} from "@angular/forms";


@Component({
    selector: 'app-account',
    templateUrl: 'account.page.html',
    styleUrls: ['account.page.scss']
})
export class AccountPage {
    errorMsg: string;
    private router: any;
    constructor(private api: AccountService) {

    }

    loginWorker(form: NgForm) {
        const object: InlineObject = {
            username: form.value.username,
            password: form.value.password
        }
        this.api.login(object).subscribe(data => {
            if (data.success) {
                this.api.login(data)
                console.log('Worker is Logged in.');
            } else {
                this.errorMsg = 'Worker does not exist!';
            }
        });
    }

}
