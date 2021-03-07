import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

/**
 * @author John Shields
 * @title Authentication Guard
 * @desc Adds Authentication to the app. This blocks all the report activity pages if a user is not logged in.
 * Only account, login & registration pages are available unauthenticated users.
 *
 * Reference https://www.jspanther.com/blog/auth-guard-the-routes-with-angular/
 */

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    // Works with auth.service.ts to check if user is logged in.
    canActivate(): boolean {
        // if user is logged in return true
        if (this.authService.loggedIn()) {
            return true;
        }
        // if user is not logged in return false and navigate to account page.
        else {
            this.router.navigate(['']);
            return false;
        }
    }

}
