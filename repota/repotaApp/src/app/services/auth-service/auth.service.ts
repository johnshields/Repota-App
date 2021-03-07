import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

/**
 * @author John Shields
 * @title Authentication Service
 * @desc Checks for user's cookie in the application storage.
 *
 * References
 * https://www.jspanther.com/blog/auth-guard-the-routes-with-angular/
 * https://itnext.io/angular-8-how-to-use-cookies-14ab3f2e93fc
 */

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private cookieService: CookieService) {
    }

    // get the cookie 'session_id' set by Horton (Backend).
    loggedIn() {
        return !!this.cookieService.get('session_id');
    }

}
