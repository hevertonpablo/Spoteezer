import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../login/services/authentication.service';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        private snackBar: MatSnackBar

    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

            if (err.status === 400) {

                console.log(err)

                //this.snack(err.error.errors[0])

            } else if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                // location.reload();
            } else if (err.status === 422) {

                this.snack(err.error.errors[0])

            } else if (err.status >= 500) {
                this.snack('Obtivemos um erro inesperado, tente mais tarde')
            }

            //const error = err.error.message || err.statusText; 
            const error = err.error
            return throwError(error);
        }))
    }

    snack(message: any) {

        this.snackBar.open(message, 'X', {
            duration: 3000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top',


        })
    }
}

