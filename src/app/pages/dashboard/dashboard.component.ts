import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/app.service';

@Component({
  selector: 'pvi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  dashboardData:any;
  displayedColumns:any[] = [];
  dataSource : any[] = []
  constructor(private appService: AppService) { }
  
  fetchDashboardData(){
    this.appService.getDashboardData().subscribe((data:any) => {
      console.log(data);
      this.dashboardData = data;
      this.displayedColumns = this.dashboardData.headerValues.map((item:any) => {
        item = item.replace(/ /g, "");
        return item;
      });
      let columns = this.dashboardData.searchResultList;
      columns.forEach((column:any)=>{
        var result = {} as any;
        this.displayedColumns.forEach((key,i) => {
          result[key] = column[i];
        });
        this.dataSource.push(result);
        console.log(this.dataSource);
      });
    });
    console.log(this.dashboardData)
  }
  
  ngOnInit(): void {
    this.fetchDashboardData()
  }

}
