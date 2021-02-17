import {Component, OnInit} from '@angular/core';
import {AccountService} from '../services/client_stubs';

@Component({
    selector: 'app-account',
    templateUrl: './account.page.html',
    styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

    constructor(private api: AccountService) {
    }

    ngOnInit() {
    }
}
