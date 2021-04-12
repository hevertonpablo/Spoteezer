import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  loading: boolean = false
  returnUrl: string = ''

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private service: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.service.logout()

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: ['', Validators.required]
    })
  }

  get f() { return this.loginForm.controls; }


  onSubmit() {

    if (this.loginForm.invalid) {
      this.snack('Todos os dados são obrigatório')
      return;
    }

    this.loading = true

    this.service.login(this.f.email.value, this.f.password.value).subscribe(

      (_) => {


        this.service.getToken().subscribe(
          
          (response: any) => {

            localStorage.setItem('tokenSpotify', response.access_token)
            this.router.navigate([this.returnUrl])         
        })


        
      },

      (_) => {
        this.loading = false
        this.snack('Credencias fornecidas inválida.')
      }
    )

  }


  snack(message: string) {

    this.snackBar.open(message, 'X', {
      duration: 3000,
      panelClass: ['blue-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top',


    })

  }


}
