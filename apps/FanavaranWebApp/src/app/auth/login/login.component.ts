import { AuthService } from '../providers/auth.service'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  setBgImg() {
    let backgroundImgs = ["auth-background-1.jpg", "auth-background-2.jpg", "auth-background-3.jpg", "auth-background-4.jpg"]
    let backgroundImg = backgroundImgs[Math.floor(Math.random() * backgroundImgs.length)]
    let element = document.getElementsByClassName('right-side')[0] as HTMLElement
    element.style.backgroundImage = `url(../../assets/img/auth/${backgroundImg})`
  }

  form = this.formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  })

  get control() { return this.form.controls }

  getErrorMessage(name: string) {
    if (name == 'username' && this.control.username.hasError('required')) return 'نام کاربری الزامی است';
    if (name == 'password' && this.control.username.hasError('required')) return 'کلمه عبور الزامی است';
  }

  login() {
    /* localStorage.clear()
    sessionStorage.clear()
    const formData = new FormData()
    formData.append('grant_type', 'password')
    formData.append('password', this.form.controls.password.value)
    formData.append('username', this.form.controls.username.value)
    formData.append('username', this.form.controls.username.value)

    this.authService.login(formData).subscribe((res: any) => {
      this.authService.setAuthDataToLocalStorage(res.Data)
      this.authService.routeToDashboard()
    }) */

    this.router.navigateByUrl("main")
    /* this.authService.signinRedirect() */
  }

  HasCaptcha: boolean = false
  showSmallSpinner: boolean = true
  getAppInfo() {
    this.authService.getAppInfo().subscribe((res: any) => {
      this.showSmallSpinner = false
      this.HasCaptcha = res.Data.HaveCaptcha
    }, _ => this.showSmallSpinner = false)
  }

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    // this.setBgImg()
    if (this.authService.token && !this.authService.isTokenExpired()) return this.authService.routeToDashboard()
    else this.authService.removeLocalStorage()
    this.getAppInfo()
    this.form.reset()
  }

}
