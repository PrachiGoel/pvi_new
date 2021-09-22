import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { AppService } from 'src/app/shared/app.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-case-management',
  templateUrl: './case-management.component.html',
  styleUrls: ['./case-management.component.scss']
})
export class CaseManagementComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource:any;
  userData:any;
  displayedColumns:any[] = [];
  ELEMENT_DATA : any[] = [];
  emailIds : any[] = [];
  constructor(private appService: AppService,
              private datePipe:DatePipe) { }

  selected: any;
  userRolesList = ["ROLE_CPO_JAPAN","ROLE_REPORTER","ROLE_IT_ADMIN","ROLE_CPO_ARGENTINA","ROLE_BUSINESS_ADMIN","ROLE_VENDOR_ADMIN"]
  caseForm = new FormGroup({
    userType: new FormControl(),
    vendorName: new FormControl(),
    email: new FormControl(),
    seriousness: new FormControl(),
  });
   
  ngOnInit(): void {
    this.emailIds = ["popdevuser5@yopmail.com","prachi.pop1@yopmail.com","prachi.pop@yopmail.com"]
    this.selected = 'option1';
    this.displayedColumns = ['Select','Case Id','Product Name','Event Name','Seriousness']
    this.fetchUserData();
  }
  fetchUserData(){
     
    this.appService.getCaseManagementData().subscribe((data:any) => {
      //console.log(data);
      this.userData = data;
      this.displayedColumns = this.displayedColumns.map((item:any) => {
        item = item.replace(/ /g, "");
        return item;
      });
      // this.displayedColumns.push("CaseHistory")
     
      this.userData.forEach((column:any)=>{
        var result = {} as any;
        this.displayedColumns.forEach((key,i) => {
          if(key == 'Select'){
            result[key] = "Select"
          }else if(key == 'CaseId'){
            result[key] = column['aegisCaseID'];
          }else if(key == 'ProductName'){
            result[key] = column['productName'];
          }else if(key == 'EventName'){
            result[key] = column['eventName'];
          }else if(key == 'Seriousness'){
            result[key] = column['isCaseSerious'];
          }
        });
        this.ELEMENT_DATA.push(result);
      });
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }
  onSubmit() {
    console.log(this.caseForm.value);
  }
  

}
