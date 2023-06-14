import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toast: ToastrService,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onLogin() {
    console.log(this.loginForm.value)
    const { email, password } = this.loginForm.value;

    //hacer login con firebase

    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then( (res: any) => {
        let { accessToken, email} = res?.user?._delegate
        console.log({email}, {accessToken})
        console.log(res)
        this.router.navigate(['/home'])
      })
      .catch((error) => {
        this.toast.error(error.code, 'Error');
      });
  }
}
