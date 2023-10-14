import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { forgotPassword } from 'src/app/forms/auth-form';
import AuthService from 'src/app/services/authentication-services/auth.service';
import DialogModalService from 'src/app/services/global-services/dialogModal.service';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss'],
})
export class ForgotPasswordPageComponent implements OnInit {
  forgotPassword: FormGroup = forgotPassword();
  submitted: boolean = false;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private dialogModalService: DialogModalService,
    private router: Router
  ) {}

  ngOnInit() {}

  get form() {
    return this.forgotPassword.controls;
  }

  onSubmit() {
    if (this.submitted && this.forgotPassword.invalid) {
      return;
    } else {
      this.checkValidataEmailService();
    }
  }

  private checkValidataEmailService() {
    this.submitted = true;
    this.authService.validateEmail(this.forgotPassword.value).subscribe({
      next: ({ data }) => {
        console.log(`dataaaaaa`, data);
        if (data.exist === true) {
          this.setServiceOnSubmit();
        } else {
          this.dialogOnEmailError();
        }
      },
    });
  }

  private setServiceOnSubmit() {
    this.loading = true;
    this.authService
      .requestForgetPassword(this.forgotPassword.value)
      .subscribe({
        next: ({ data }) => this.dialogOnSuccess(data),
        error: (err) => {
          console.error(`Request Forget Password Failed : `, err.message);
        },
      });
  }

  private dialogOnSuccess(data: any) {
    this.loading = false;
    console.log(`Submit: `, data);
    this.router
      .navigate(['/auth/forgot-password/check-mail'], {
        queryParams: {
          ref_email: this.forgotPassword.value.email,
        },
      })
      .then();
  }

  private dialogOnEmailError() {
    this.dialogModalService.openUnsuccessfulModal(
      'ไม่พบอีเมลในระบบ',
      `อีเมล ${this.forgotPassword.value.email} ไม่พบในระบบ<br>กรุณาลองใหม่อีกครั้ง`,
      () => {
        this.clearState();
      }
    );
  }

  private clearState() {
    this.loading = false;
    this.submitted = false;
  }
}
