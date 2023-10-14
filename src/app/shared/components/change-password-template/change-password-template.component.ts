import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { changePasswordForm } from 'src/app/forms/auth-form';
import DialogModalService from 'src/app/services/global-services/dialogModal.service';

@Component({
  selector: 'app-change-password-template',
  templateUrl: './change-password-template.component.html',
  styleUrls: ['./change-password-template.component.scss'],
})
export class ChangePasswordTemplateComponent {
  changePasswordForm: FormGroup = changePasswordForm();
  formValidated: boolean = false;
  passwordMatched: boolean = false;

  listCondition: string[] = [
    'พิมพ์ใหญ่อย่างน้อย 1 ตัวอักษร',
    'พิมพ์เล็กอย่างน้อย 1 ตัวอักษร',
    'ตัวเลขอย่างน้อย 1 ตัวอักษร',
    'รหัสผ่านต้องมีอย่างน้อย 8-16 ตัวอักษร',
  ];

  showPassword: boolean = false;
  password: any;
  confirmPassword: any;
  showConfirmPassword: boolean = false;

  @Input()
  submitted: boolean = false;

  @Input()
  oldPasswordError: any;

  @Output()
  onPasswordEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private dialogService: DialogModalService) {}

  ngOnInit() {
    this.changePasswordForm.valueChanges.subscribe(
      () => (this.formValidated = this.changePasswordForm.valid)
    );
    this.form['confirmPassword'].valueChanges.subscribe((value) => {
      if (!value) this.passwordMatched = false;
      this.passwordMatched = value == this.form['password'].value;
    });

    this.password = 'password';
    this.confirmPassword = 'password';
  }

  onShowPassword() {
    if (this.password === 'password') {
      this.password = 'text';
      this.showPassword = true;
    } else {
      this.password = 'password';
      this.showPassword = false;
    }
  }

  onShowConfirmPassword() {
    if (this.confirmPassword === 'password') {
      this.confirmPassword = 'text';
      this.showConfirmPassword = true;
    } else {
      this.confirmPassword = 'password';
      this.showConfirmPassword = false;
    }
  }

  validatePasswordOnKeyUp() {
    if (this.changePasswordForm.valid)
      this.passwordMatched =
        this.form['password'].value === this.form['confirmPassword'].value;
    else this.passwordMatched = false;
  }

  doBlur(event: any) {
    let target = event.target;
    target.blur();
  }

  get form() {
    return this.changePasswordForm.controls;
  }

  formHasError(controlName: string, errCode: string): boolean {
    if (this.form[controlName].hasError('required')) {
      return true;
    }
    return this.form[controlName].hasError(errCode);
  }

  onSubmit() {
    if (this.oldPasswordError == 400) {
      this.dialogService.openUnsuccessfulModal(
        'เปลี่ยนรหัสผ่านไม่สำเร็จ',
        'ไม่สามารถบันทึกรหัสผ่านเดิมได้ กรุณากรอกใหม่อีกครั้ง',
        () => {
          console.error(`Change password failed!!`);
        }
      );
    } else {
      this.onPasswordEmitter.emit(this.form['confirmPassword'].value);
    }
  }
}
