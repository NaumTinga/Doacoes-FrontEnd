// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../../services/authentication/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Change 'username' to 'email'
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    // Update to use 'email' instead of 'username'
    this.authService.login(this.f.email.value, this.f.password.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']); // Redirect to protected route
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
    console.log(this.loginForm.value);
  }
}
