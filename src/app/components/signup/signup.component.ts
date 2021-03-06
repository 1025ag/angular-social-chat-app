import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';
import { TokenService } from 'src/app/services/token.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signUpForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private uiService: UiService,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.initForm();
  };

  initForm() {
    this.signUpForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  };

  signup() {
    this.uiService.loadingSubjet.next(true);

    this.authService.signUp(this.signUpForm.value).pipe(
      tap(
        {
          next: resp => {

            this.tokenService.setToken(resp['token']); //Set Token in the cookies

            this.tokenService.setUserName(resp['user'].username);

            this.signUpForm.reset(); //Rest Form

            this.uiService.loadingSubjet.next(false);

            this.router.navigate(['/']);
          }
        }
      ),
      catchError((error => of(
        this.uiService.errorHandler(error),
        this.uiService.loadingSubjet.next(false)
      )))
    ).subscribe();
  };

};
