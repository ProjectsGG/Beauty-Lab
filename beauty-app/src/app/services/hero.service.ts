import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private url: any = 'http://localhost/beauty-lab/beauty-api/public/api';
  private token: string = null;
  constructor(private router: Router) { }
  getUrl() {
    return this.url;
  }
  getToken() {
    return this.token;
  }
  setToken(token: string) {
    this.token = token;
  }
  // validateSession(){
  //   if (this.token==null) {
  //     this.storage.get('token').then((response)=>{
  //       if(response==null) this.router.navigate(['/login'])
  //     })
  //   }
  // }
}