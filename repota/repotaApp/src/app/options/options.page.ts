import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-options',
    templateUrl: 'options.page.html',
    styleUrls: ['options.page.scss']
})
export class OptionsPage implements OnInit {

    constructor() {
    }

    // switch between light and dark theme
    onToggleTheme(event) {
        if (event.detail.checked) {
            document.body.setAttribute('color-theme', 'light');
        } else {
            document.body.setAttribute('color-theme', 'dark');
        }
    }

    ngOnInit() {
        // set dark theme to default theme
        document.body.setAttribute('color-theme', 'dark');
    }
}
