import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth-service/auth.service";

@Component({
    selector: 'app-account',
    templateUrl: './account.page.html',
    styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

    constructor(public authService: AuthService) {
    }

    ngOnInit() {
    }
}
