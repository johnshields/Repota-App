import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage {
    private router: any;

    constructor(public navCtrl: NavController) {
    }

    createPage() {
        this.router.navigate(['/tabs/create']);
    }
}
