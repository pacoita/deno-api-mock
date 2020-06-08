import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../data-service/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, EMPTY } from 'rxjs';
import { Employee } from '../model/employee.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  form: FormGroup;
  isEdit = false;
  private employee: Employee;

  constructor(
    private service: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();

    this.route.paramMap
      .pipe(
        switchMap(p => {
          const eId = +p.get('employeeId');
          if (eId > 0) {
            this.isEdit = true;
            return this.service.getEmployee(eId);
          }
          this.isEdit = false;
          return EMPTY;
        }),
        filter(f => !!f)
      )
      .subscribe(employee => {
        this.employee = employee;
        this.form.patchValue(employee);
      });

  }

  get firstname() {
    return this.form.get('firstname');
  }
  get lastname() {
    return this.form.get('lastname');
  }
  get email() {
    return this.form.get('email');
  }

  createEmployee() {
    if (this.form.valid) {
      this.service.createEmployee(this.form.value as Employee).subscribe(() => {
        this.navigateBack();
      });
    }
  }

  updateEmployee() {
    if (this.form.valid) {
      const payload = { ...this.employee, ...this.form.value };
      this.service.updateEmployee(payload).subscribe(() => {
        this.navigateBack();
      });
    }
  }

  removeEmployee() {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      const payload = { ...this.employee, ...this.form.value };
      this.service.removeEmployee(payload).subscribe(() => {
        this.navigateBack();
      });
    }
  }

  navigateBack() {
    this.router.navigate(['/employees'], { queryParamsHandling: 'preserve' });
  }

  private initForm() {
    this.form = this.fb.group(
      {
        firstname: ['', { validators: Validators.required, updateOn: 'blur' }],
        lastname: ['', Validators.required],
        email: ['']
      }
    );
  }
}
