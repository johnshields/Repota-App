import {Component} from '@angular/core';
import {AccountService, InlineObject} from '../services/client_stubs';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-account',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss']
})
export class LoginPage {
    errorMsg: string;
    private errorMessage;

    constructor(private api: AccountService, private router: Router) {
    }

    setErrorMessage (error: String){
        this.errorMessage = error;
    }

    loginWorker(form: NgForm) {
        const object: InlineObject = {
            username: form.value.username,
            password: form.value.password
        };

        this.api.login(object).subscribe(data => {
            if (form != null) {
                this.router.navigate(['tabs/home']);
                this.api.login(data);
                console.log('Success');
            } else if(data.errorCode === 'ER_DUP_ENTRY'){
                this.errorMsg = 'Details are incorrect.';
            } else{
                this.setErrorMessage(data.message);
            }
        });
    }
}
