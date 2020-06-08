import { EmployeeService } from './../data-service/employee.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  employees$: Observable<Employee[]>;
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'action'];

  constructor(private service: EmployeeService) { }

  ngOnInit() {
    this.employees$ = this.service.getEmployees();
  }

}
