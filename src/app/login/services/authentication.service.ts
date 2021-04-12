import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  

  private clienteIdSecrete64 = btoa(`${environment.client_id}:${environment.client_secret}`)

  private headers = new HttpHeaders(
    {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${this.clienteIdSecrete64}`

    }
  );

  constructor(
    private http: HttpClient
  ) { }


  login(email: string, password: string): Observable<any> {
    

    //Como não existe um backend pra validaro o login, que seria responsabilidade de uma API, estou apenas buscando dados de usuário
    //baseando no e-mail informado, simulando uma validação de login. Nesse caso não esta sendo utilizado a senha recebida pra validar
    return this.http.get<User>(`${environment.localhosApi}/users?email=${email}`)
      .pipe(map((user: any) => {
       
        if (user) {

          localStorage.setItem('userLogin', JSON.stringify(user[0]));
          console.log('aqui', user[0])
        }

        return user;
      }));
  }

  getToken(): Observable<any> {

    const options = { headers: this.headers };
    let grant_type = 'client_credentials';
    let body = `grant_type=${grant_type}`;

    return this.http.post<any>(`${environment.getTokenSpotify}`, body, options)
  }

  logout() {
    // remove dados do usuário no local storage e faz o logout
    localStorage.removeItem('currentUser');
    localStorage.removeItem('tokenSpotify');
  }


}
