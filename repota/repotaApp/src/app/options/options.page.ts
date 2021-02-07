import {Component} from '@angular/core';

@Component({
    selector: 'app-options',
    templateUrl: 'options.page.html',
    styleUrls: ['options.page.scss']
})
export class OptionsPage {

    constructor() {
    }

    // switch between light and dark theme
    onToggleTheme(event) {
        if (event.detail.checked)
        {
            document.body.setAttribute('color-theme', 'dark');
        } else {
            document.body.setAttribute('color-theme', 'light');
        }
    }
}
