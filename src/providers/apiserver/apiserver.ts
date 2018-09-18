import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the ApiserverProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

// let apiurl1: string = "http://139.59.42.70:5000/v1/candidate";

// let apiurl2: string = "http://139.59.42.70:5000/v1/keywords";

let apiurl1: string = "assets/jsondata/candidate.json";

let apiurl2: string = "assets/jsondata/keywords.json";

// let apiurl1: string = "http://139.59.42.70/apiserver/candidate/";

// let apiurl2: string = "http://139.59.42.70/apiserver/keywords/";


@Injectable()
export class ApiserverProvider {

  constructor(public http: Http) {
    console.log('Hello PeopleproviderProvider Provider');
  }

  getCandidateData() {
    return new Promise((resolve, reject) => {

      this.http.get(apiurl1).subscribe(res => {
        console.log(res.json());
        resolve(res.json());
      }, (err) => {
        reject(err);
      });

    });
    // return this.http.get(apiurl1)
    //   .map(res => res.json());
  }

  getkeywordsData() {
    // console.log(credentials);
    let headers: Headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Access-Control-Allow-Headers', 'X-AMZ-META-TOKEN-ID, X-AMZ-META-TOKEN-SECRET');
    let options = new RequestOptions({ headers: headers });
    return new Promise((resolve, reject) => {

      this.http.get(apiurl2).subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });

    });

    // return this.http.get(apiurl2)
    //   .map(res => res.json());
  }

}
