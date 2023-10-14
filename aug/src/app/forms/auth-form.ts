import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import PasswordFormValidator from './validators/passwordform.validator';
// import { ConfirmedValidator } from '../directives/confirmed-validator';

// Login Form
export const loginForm = () => {
  return new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'change',
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
      ],
      updateOn: 'change',
    }),
  });
};

// Forget Password Form
export const forgotPassword = () => {
  return new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
};

// Change password

let regexValidator: ValidatorFn[] = [
  PasswordFormValidator.regexValidator(/[A-Z]/, { hasCapitalCase: true }),
  PasswordFormValidator.regexValidator(/\d/, { hasNumber: true }),
  PasswordFormValidator.regexValidator(/[a-z]/, { hasSmallCase: true }),
];

export const changePasswordForm = () => {
  return new FormGroup({
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        ...regexValidator,
      ],
      updateOn: 'change',
    }),
    confirmPassword: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        ...regexValidator,
      ],
      updateOn: 'change',
    }),
  });
};
