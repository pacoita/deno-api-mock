import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../data-service/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
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
          return null;
        }),
        filter(f => !!f)
      )
      .subscribe(employee => {
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
      this.service.createEmployee(this.form.value).subscribe(() => {
        this.navigateBack();
      });
    }
  }

  updateEmployee() {
    if (this.form.valid) {
      this.service.updateEmployee(this.form.value).subscribe(() => {
        this.navigateBack();
      });
    }
  }

  removeEmployee() {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.service.removeEmployee(this.form.value).subscribe(() => {
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
