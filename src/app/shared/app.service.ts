import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }
  REST_API_SERVER = "assets/data/dashboard.json";
  
  getDashboardData(){
    return this.http.get(this.REST_API_SERVER)
  }
  getUserManagementData(){
    return this.http.get('assets/data/usermanagement.json')
  }
  getCaseManagementData(){
    return this.http.get('assets/data/casemanagement.json')
  }
}
