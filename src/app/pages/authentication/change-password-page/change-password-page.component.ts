import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import AuthService from 'src/app/services/authentication-services/auth.service';
import DialogModalService from 'src/app/services/global-services/dialogModal.service';
import RouteService from 'src/app/services/global-services/routeService';

@Component({
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
  styleUrls: ['./change-password-page.component.scss'],
})
export class ChangePasswordPageComponent implements OnInit {
  refCode!: string;
  credential!: string;
  isPageReady: boolean = false;
  oldPasswordError: any;

  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private readonly routeService: RouteService,
    private dialogModalService: DialogModalService
  ) {}

  ngOnInit() {
    this.checkRequireParams(this.activeRoute.snapshot.queryParams);
  }

  private checkRequireParams(param: any) {
    if (!param['code'] && !param['ref_code']) {
      this.routeService.revokeCredentialAndGotoLogin().then();
    } else {
      this.refCode = param['ref_code'];
      this.credential = param['code'];
      this.authService
        .verifyResetPasswordCredential({
          refCode: this.refCode,
          credential: this.credential,
        })
        .subscribe({
          next: (resp: any) => this.verifyOtpCredentialSuccessful(resp.data),
          error: (err) => this.verifyOtpCredentialFailed(err),
        });
    }
  }

  verifyOtpCredentialSuccessful(data: any) {
    if (!data.validated) this.routeService.toLogin().then();
    this.isPageReady = true;
  }

  verifyOtpCredentialFailed(err: HttpErrorResponse) {
    console.error(`Check Require Params : `, err);
    this.routeService.revokeCredentialAndGotoLogin().then;
  }

  onChangePassword(event: any) {
    let body = {
      refCode: this.refCode,
      credential: this.credential,
      password: event,
    };
    this.authService.resetPassword(body).subscribe({
      next: () => {
        this.dialogModalService.openCompleteModal(
          'เปลี่ยนรหัสผ่านสำเร็จ',
          '',
          'กลับหน้าเข้าสู่ระบบ',
          () => {
            this.routeService.toLogin().then();
          }
        );
      },
      error: (err) => {
        this.oldPasswordError = err.status;
        console.error(`unSuccess : `, err.status);
      },
    });
  }
}
