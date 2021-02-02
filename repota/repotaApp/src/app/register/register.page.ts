import {Component, OnInit} from '@angular/core';
import {AccountService, InlineObject} from "../services/client_stubs";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
    errorMsg: string;

    constructor(private api: AccountService) {

    }

    registerWorker(form: NgForm) {
        const object: InlineObject = {
            username: form.value.username,
            name: form.value.name,
            password: form.value.password
        }
        this.api.register(object).subscribe(data => {
            if (data.success) {
                this.api.register(data)
                console.log('Worker is Registered.');
            } else {
                this.errorMsg = 'This username already exists in the database, please try another one.';
            }
        });
        console.log(form.value);
        form.resetForm();
    }

    ngOnInit(): void {
    }
}