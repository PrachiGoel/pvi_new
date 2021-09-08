import { AfterViewInit,Component, OnInit,ViewChild } from '@angular/core';
import { AppService } from 'src/app/shared/app.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'pvi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dataSource:any;
  dashboardData:any;
  displayedColumns:any[] = [];
  ELEMENT_DATA : any[] = [];
  constructor(private appService: AppService) { }
  
  fetchDashboardData(){
     
    this.appService.getDashboardData().subscribe((data:any) => {
      console.log(data);
      this.dashboardData = data;
      this.displayedColumns = this.dashboardData.headerValues.map((item:any) => {
        item = item.replace(/ /g, "");
        return item;
      });
      this.displayedColumns.push("CaseHistory")
      let columns = this.dashboardData.searchResultList;
      columns.forEach((column:any)=>{
        var result = {} as any;
        this.displayedColumns.forEach((key,i) => {
          if(key == 'CaseHistory'){
            result[key] = "History"
          }else{
            result[key] = column[i];
          }
        });
        this.ELEMENT_DATA.push(result);
        
      });
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }
  
  ngOnInit(): void {
    this.fetchDashboardData()
  }
 
}
