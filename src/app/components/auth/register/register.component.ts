import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  public registerForm: FormGroup

  constructor(private fb: FormBuilder, private toast: ToastrService, private afAuth: AngularFireAuth, private router: Router, private userService: UserService){
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      role: ['CUSTOMER', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    
  }

  onSubmit(){
    console.log(this.registerForm.value)
    const {email, password, repeatPassword} = this.registerForm.value
    if(password !== repeatPassword){
      this.toast.error("Passsword most be the same", "Error")
      return
    }

    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then( () => {
        this.toast.success("Login successfully", "Success")
        this.router.navigate(['/login'])
        this.userService.postUser(this.registerForm.value).subscribe({
          next: _user => {
            console.log(_user)
          },
          error: error => {
            console.log(error)
          }
        })
      })
      .catch( error => {
        this.toast.error(error.code, "Error")
      })
  }

}
