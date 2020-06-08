import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(`${environment.apiBaseUrl}/employees`)
      .pipe(catchError((error: any) => throwError(error)));
  }


  getEmployee(id: number): Observable<Employee> {
    return this.http
      .get<Employee>(`${environment.apiBaseUrl}/employees/${id}`)
      .pipe(catchError((error: any) => throwError(error)));
  }

  createEmployee(payload: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(`${environment.apiBaseUrl}/employees`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }

  updateEmployee(payload: Employee): Observable<Employee> {
    return this.http
      .put<Employee>(`${environment.apiBaseUrl}/employees/${payload.id}`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }

  removeEmployee(payload: Employee): Observable<any> {
    return this.http
      .delete<any>(`${environment.apiBaseUrl}/employees/${payload.id}`)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
