import {Component, OnInit} from '@angular/core';
import {AccountService, InlineObject} from '../services/client_stubs';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    errorMsg: string;
    private errorMessage;

    constructor(private api: AccountService, private router: Router) {
    }

    setErrorMessage(error: String) {
        this.errorMessage = error;
    }

    registerWorker(form: NgForm) {
        const object: InlineObject = {
            username: form.value.username,
            name: form.value.name,
            password: form.value.password
        };
        this.api.register(object).subscribe(data => {
            if (form != null) {
                this.router.navigate(['tabs/login']);
                this.api.register(data);
            } else {
                this.setErrorMessage(data.message);
            }
        });
        console.log(form.value);
        form.resetForm();
    }

    ngOnInit() {
    }
}
