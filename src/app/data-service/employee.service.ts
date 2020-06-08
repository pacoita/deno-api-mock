import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(`${environment.apiBaseUrl}/employees`)
      .pipe(catchError((error: any) => _throw(error)));
  }


getEmployee(id: number): Observable<Employee> {
  return this.http
    .get<Employee>(`${environment.apiBaseUrl}/employees/${id}`)
    .pipe(catchError((error: any) => _throw(error)));
}

  createEmployee(payload: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(`${environment.apiBaseUrl}/employees`, payload)
      .pipe(catchError((error: any) => _throw(error)));
  }

  updateEmployee(payload: Employee): Observable<Employee> {
    return this.http
      .put<Employee>(`${environment.apiBaseUrl}/employees/${payload.id}`, payload)
      .pipe(catchError((error: any) => _throw(error)));
  }

  removeEmployee(payload: Employee): Observable<any> {
    return this.http
      .delete<any>(`${environment.apiBaseUrl}/employees/${payload.id}`)
      .pipe(catchError((error: any) => _throw(error)));
  }
}
