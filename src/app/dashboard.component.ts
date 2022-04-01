import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { NgxLiquidGaugeModule } from 'ngx-liquid-gauge';

import { User } from './service/user.class';
import { UserService, AuthenticationService } from './service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};


@Component({ 
    selector: 'dashboard-component',
    templateUrl: 'dashboard.component.html' 
})
export class HomeComponent {
    @ViewChild("chart") chart: ChartComponent;
      public chartOptions: Partial<ChartOptions>;

    currentUser: User;
    users = [];
    title = 'Average Temperatures of Cities';
    
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
        this.chartOptions = {
              series: [
                {
                  name: "Project Completed",
                  data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
                },
                {
                  name: "Project Pending",
                  data: [20, 80, 40, 12, 39, 22, 20, 90, 100]
                }
              ],
              chart: {
                height: 350,
                type: "line",
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: "straight"
              },
              title: {
                text: "Trends by Month",
                align: "left"
              },
              grid: {
                row: {
                  colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                  opacity: 0.5
                }
              },
              xaxis: {
                categories: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep"
                ]
              }
            };
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
}