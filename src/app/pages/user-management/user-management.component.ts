import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { AppService } from 'src/app/shared/app.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource:any;
  userData:any;
  displayedColumns:any[] = [];
  ELEMENT_DATA : any[] = [];

  constructor(private appService: AppService,
              private datePipe:DatePipe) { }

  selected: any;
  userRolesList = ["ROLE_CPO_JAPAN","ROLE_REPORTER","ROLE_IT_ADMIN","ROLE_CPO_ARGENTINA","ROLE_BUSINESS_ADMIN","ROLE_VENDOR_ADMIN"]
  contactForm = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    email: new FormControl(),
    userStatus: new FormControl(),
    vendorName: new FormControl(),
    userRoles: new FormControl(),
    fromDate:new FormControl(),
    toDate:new FormControl(),
  });
   
  ngOnInit(): void {
    this.selected = 'option1';
    this.displayedColumns = ['Select','Email Id','First Name','Last Name','Organization Name','Country','User Type','User Role','Created Date','User Status','Action']
    this.fetchUserData();
  }
  fetchUserData(){
     
    this.appService.getUserManagementData().subscribe((data:any) => {
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
          }else if(key == 'EmailId'){
            result[key] = column['userId'];
          }else if(key == 'FirstName'){
            result[key] = column['firstName'];
          }else if(key == 'LastName'){
            result[key] = column['lastName'];
          }else if(key == 'OrganizationName'){
            result[key] = "Organisation 1";
          }else if(key == 'Country'){
            result[key] = column['country'];
          }else if(key == 'UserType'){
            result[key] = column['userType'];
          }else if(key == 'UserRole'){
            result[key] = column['userRle'];
          }else if(key == 'CreatedDate'){
            result[key] = this.datePipe.transform(column['createdDate'],'yyyy-MM-dd');
          }else if(key == 'UserStatus'){
            result[key] = column['userStatus'];
          }else if(key == 'Action'){
            result[key] = 'Action';
          }
        });
        this.ELEMENT_DATA.push(result);
      });
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }
  onSubmit() {
    console.log(this.contactForm.value);
  }
}
