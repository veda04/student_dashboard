import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { User } from './service/user.class';
import { AlertService, UserService, AuthenticationService } from './service';
@Component({
  selector: 'profile-component',
  templateUrl: './profile.component.html',
})

export class ProfileComponent {
    profileForm!: FormGroup;
    loading = false;
    submitted = false;
    currentUser: User;
    users = [];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        // this.loadAllUsers();
        this.profileForm = this.formBuilder.group({
            firstName: [this.currentUser.firstName, Validators.required],
            lastName: [this.currentUser.lastName, Validators.required],
            phone: [this.currentUser.phone, Validators.required],
            email: new FormControl(this.currentUser.email, Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                ])),
            password: new FormControl(this.currentUser.password, Validators.compose([
                    Validators.minLength(6),
                    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&]).*$')
                ]))
        });
    }

    get f() { return this.profileForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.profileForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.update(this.currentUser.id, this.profileForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
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
