import { Observable } from 'rxjs/internal/Observable';
;
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})




export class HomeService {



  constructor(
    private http: HttpClient,
  ) { }


  search(query: string, type: string) : Observable<any>{
    
    const url = `${environment.endPointApi}/search?q=${query}&type=${type}&ids=${environment.client_id}` 

    return this.http.get<any>(url)

  }

 


  
}
